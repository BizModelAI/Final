import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface AIInsights {
  personalizedSummary: string;
  customRecommendations: string[];
  potentialChallenges: string[];
  successStrategies: string[];
  personalizedActionPlan: {
    week1: string[];
    month1: string[];
    month3: string[];
    month6: string[];
  };
  motivationalMessage: string;
}

interface AIAnalysis {
  fullAnalysis: string;
  keyInsights: string[];
  personalizedRecommendations: string[];
  successPredictors: string[];
  riskFactors: string[];
}

interface AIInsightsData {
  insights: AIInsights;
  analysis: AIAnalysis;
  timestamp: number;
  quizAttemptId?: number;
}

interface AIInsightsContextType {
  aiInsights: AIInsightsData | null;
  setAIInsights: (data: AIInsightsData) => void;
  clearAIInsights: () => void;
  isLoading: boolean;
}

const AIInsightsContext = createContext<AIInsightsContextType | undefined>(undefined);

export const useAIInsights = () => {
  const context = useContext(AIInsightsContext);
  if (context === undefined) {
    throw new Error('useAIInsights must be used within an AIInsightsProvider');
  }
  return context;
};

interface AIInsightsProviderProps {
  children: ReactNode;
}

export const AIInsightsProvider: React.FC<AIInsightsProviderProps> = ({ children }) => {
  const [aiInsights, setAIInsightsState] = useState<AIInsightsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Load AI insights from localStorage on mount (for page refreshes)
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Check both storage keys for backward compatibility
        const stored = localStorage.getItem('ai-insights-data') || localStorage.getItem('quiz-completion-ai-insights');
        
        if (stored) {
          const parsed = JSON.parse(stored);
          
          // Add null/undefined check before accessing timestamp
          if (parsed && typeof parsed.timestamp === 'number') {
            // Check if data is still valid (24 hours for better persistence)
            const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000;
            
            if (!isExpired) {
              // Handle both AIInsightsData format and QuizCompletionLoading format
              if (parsed.insights && parsed.analysis) {
                setAIInsightsState(parsed);
              } else {
                console.log('Found legacy data format, converting...');
                // Convert legacy format if needed
                setAIInsightsState(parsed);
              }
            } else {
              localStorage.removeItem('ai-insights-data');
              localStorage.removeItem('quiz-completion-ai-insights');
            }
          } else {
            // Remove invalid or corrupted data
            localStorage.removeItem('ai-insights-data');
            localStorage.removeItem('quiz-completion-ai-insights');
          }
        } else {
        }
      } catch (error) {
        console.error('Error loading AI insights from storage:', error);
      }
    };

    loadFromStorage();
  }, []);

  const setAIInsights = (data: AIInsightsData) => {
    setAIInsightsState(data);
    // Store in localStorage immediately using both keys for compatibility
    try {
      localStorage.setItem('ai-insights-data', JSON.stringify(data));
      localStorage.setItem('quiz-completion-ai-insights', JSON.stringify(data));
    } catch (error) {
      console.error('Error storing AI insights in localStorage:', error);
    }
  };


  const clearAIInsights = () => {
    setAIInsightsState(null);
    localStorage.removeItem('ai-insights-data');
    localStorage.removeItem('quiz-completion-ai-insights');
  };

  const value: AIInsightsContextType = {
    aiInsights,
    setAIInsights,
    clearAIInsights,
    isLoading,
  };

  return (
    <AIInsightsContext.Provider value={value}>
      {children}
    </AIInsightsContext.Provider>
  );
}; 