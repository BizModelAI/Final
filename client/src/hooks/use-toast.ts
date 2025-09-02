import { useState, useCallback, useRef, useEffect } from 'react';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

let toastIdCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Refs to store timeout IDs for cleanup
  const timeouts = useRef<Set<NodeJS.Timeout>>(new Set());

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastIdCounter}`;
    const newToast: Toast = { id, title, description, variant };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove toast after 5 seconds
    const toastTimeout = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
    timeouts.current.add(toastTimeout);
    
    // For now, just log to console since we don't have a toast UI component
    console.log(`Toast [${variant}]:`, title, description || '');
  }, []);

  // Comprehensive cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clear all timeouts
      timeouts.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      timeouts.current.clear();
    };
  }, []);

  const dismiss = useCallback((toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
};