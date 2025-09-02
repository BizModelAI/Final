/**
 * Quiz data retry utility for handling failed saves
 */

export interface RetryAttempt {
  quizData: any;
  timestamp: number;
  retryCount: number;
}

export class QuizDataRetryManager {
  private static instance: QuizDataRetryManager;
  private retryKey = 'quizDataRetryQueue';
  private maxRetries = 5;
  private retryDelay = 2000; // 2 seconds initial delay

  private constructor() {}

  public static getInstance(): QuizDataRetryManager {
    if (!QuizDataRetryManager.instance) {
      QuizDataRetryManager.instance = new QuizDataRetryManager();
    }
    return QuizDataRetryManager.instance;
  }

  /**
   * Add a failed quiz data save to the retry queue
   */
  public addToRetryQueue(quizData: any): void {
    try {
      const retryQueue = this.getRetryQueue();
      const newAttempt: RetryAttempt = {
        quizData,
        timestamp: Date.now(),
        retryCount: 0,
      };

      retryQueue.push(newAttempt);
      localStorage.setItem(this.retryKey, JSON.stringify(retryQueue));
      console.log('📝 Added quiz data to retry queue');
    } catch (error) {
      console.error('Failed to add quiz data to retry queue:', error);
    }
  }

  /**
   * Get the current retry queue
   */
  private getRetryQueue(): RetryAttempt[] {
    try {
      const stored = localStorage.getItem(this.retryKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to read retry queue:', error);
      return [];
    }
  }

  /**
   * Save the retry queue back to localStorage
   */
  private saveRetryQueue(queue: RetryAttempt[]): void {
    try {
      localStorage.setItem(this.retryKey, JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to save retry queue:', error);
    }
  }

  /**
   * Process all pending retry attempts
   */
  public async processRetryQueue(): Promise<void> {
    const retryQueue = this.getRetryQueue();
    
    if (retryQueue.length === 0) {
      return;
    }

    console.log(`🔄 Processing ${retryQueue.length} quiz data retry attempts`);

    const successfulIndices: number[] = [];

    for (let i = 0; i < retryQueue.length; i++) {
      const attempt = retryQueue[i];
      
      // Skip if too many retries
      if (attempt.retryCount >= this.maxRetries) {
        console.warn(`⚠️ Quiz data retry attempt exceeded max retries (${this.maxRetries})`);
        successfulIndices.push(i); // Remove from queue
        continue;
      }

      // Skip if too old (24 hours)
      const age = Date.now() - attempt.timestamp;
      if (age > 24 * 60 * 60 * 1000) {
        console.warn('⚠️ Quiz data retry attempt too old, removing from queue');
        successfulIndices.push(i); // Remove from queue
        continue;
      }

      try {
        const success = await this.retryQuizDataSave(attempt.quizData);
        
        if (success) {
          console.log('✅ Quiz data retry successful');
          successfulIndices.push(i);
        } else {
          attempt.retryCount++;
          console.log(`❌ Quiz data retry failed (attempt ${attempt.retryCount}/${this.maxRetries})`);
        }
      } catch (error) {
        console.error('❌ Quiz data retry error:', error);
        attempt.retryCount++;
      }

      // Add delay between retries
      if (i < retryQueue.length - 1) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }

    // Remove successful attempts from queue
    if (successfulIndices.length > 0) {
      const updatedQueue = retryQueue.filter((_, index) => !successfulIndices.includes(index));
      this.saveRetryQueue(updatedQueue);
      console.log(`🗑️ Removed ${successfulIndices.length} completed retry attempts from queue`);
    }
  }

  /**
   * Attempt to save quiz data to the server
   */
  private async retryQuizDataSave(quizData: any): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/save-quiz-data', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizData }),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.quizAttemptId) {
          // Update the current quiz attempt ID if we got a newer one
          const currentId = localStorage.getItem('currentQuizAttemptId');
          if (!currentId || responseData.quizAttemptId > parseInt(currentId)) {
            localStorage.setItem('currentQuizAttemptId', responseData.quizAttemptId.toString());
          }
        }
        
        return true;
      }

      console.error('Quiz data retry failed with status:', response.status);
      return false;
    } catch (error) {
      console.error('Quiz data retry network error:', error);
      return false;
    }
  }

  /**
   * Clear all retry attempts
   */
  public clearRetryQueue(): void {
    localStorage.removeItem(this.retryKey);
    console.log('🗑️ Cleared quiz data retry queue');
  }

  /**
   * Get the current retry queue size
   */
  public getRetryQueueSize(): number {
    return this.getRetryQueue().length;
  }

  /**
   * Check if there are pending retries and process them if the user is authenticated
   */
  public async checkAndProcessPendingRetries(): Promise<void> {
    const queueSize = this.getRetryQueueSize();
    
    if (queueSize > 0) {
      console.log(`📋 Found ${queueSize} pending quiz data retry attempts`);
      await this.processRetryQueue();
    }
  }
}

// Export singleton instance
export const quizDataRetryManager = QuizDataRetryManager.getInstance();