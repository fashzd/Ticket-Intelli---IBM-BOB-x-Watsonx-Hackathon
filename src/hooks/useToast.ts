'use client';

import { useState, useCallback } from 'react';
import { ToastProps } from '@/components/ui/Toast';

/**
 * useToast Hook
 * 
 * Custom hook for managing toast notifications.
 * Provides methods to show and dismiss toasts.
 */

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ShowToastOptions {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = useCallback(({ type, title, message, duration = 5000 }: ShowToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: (toastId: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== toastId));
      },
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    dismissToast,
    dismissAll,
  };
}

// Made with Bob