import React, { useEffect } from "react";
import { SaveQuizResultsModal } from "./SaveQuizResultsModal";
import { useNavigationGuard } from "../hooks/useNavigationGuard";
import { useAuth } from "../contexts/AuthContext";
import { quizDataRetryManager } from "../utils/quizDataRetry";

interface NavigationGuardWrapperProps {
  children: React.ReactNode;
}

export const NavigationGuardWrapper: React.FC<NavigationGuardWrapperProps> = ({
  children,
}) => {
  const { user } = useAuth();
  
  // Navigation guard for unsaved quiz results
  const {
    showSaveModal,
    hasPendingQuizResults,
    navigateWithGuard,
    handleSaveResults: guardHandleSaveResults,
    handleLoseResults,
    handleCloseModal,
  } = useNavigationGuard();

  // Process pending quiz data retries when user authenticates
  useEffect(() => {
    let retryProcessed = false;
    
    const processRetries = async () => {
      if (user && !retryProcessed) {
        retryProcessed = true;
        console.log('🔄 User authenticated, checking for pending quiz data retries');
        try {
          await quizDataRetryManager.checkAndProcessPendingRetries();
        } catch (error) {
          console.error('❌ Error processing quiz data retries:', error);
        }
      }
    };

    // Small delay to ensure auth is fully established
    const timeoutId = setTimeout(processRetries, 1000);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [user]);

  // Custom save results handler that triggers payment
  const handleSaveResults = () => {
    guardHandleSaveResults();
    // Navigate to save results payment page
    window.location.href = "/save-results-payment";
  };

  return (
    <>
      {children}

      {/* Save Quiz Results Modal */}
      <SaveQuizResultsModal
        isOpen={showSaveModal}
        onClose={handleCloseModal}
        onPayNow={handleSaveResults}
        onLoseResults={handleLoseResults}
      />
    </>
  );
};
