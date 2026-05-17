'use client';

import { useEffect } from 'react';
import { InlineNotification } from '@carbon/react';

/**
 * Toast Component
 * 
 * Displays temporary notification messages with auto-dismiss.
 * Supports success, error, warning, and info types.
 */

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000,
  onClose 
}: ToastProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const kindMap = {
    success: 'success' as const,
    error: 'error' as const,
    warning: 'warning' as const,
    info: 'info' as const,
  };

  return (
    <div className="fade-in" role="status" aria-live="polite">
      <InlineNotification
        kind={kindMap[type]}
        title={title}
        subtitle={message}
        onClose={() => onClose(id)}
        onCloseButtonClick={() => onClose(id)}
        hideCloseButton={false}
        lowContrast={false}
        aria-label={`${type} notification: ${title}`}
      />
    </div>
  );
}

/**
 * ToastContainer Component
 * 
 * Container for managing multiple toast notifications.
 */

interface ToastContainerProps {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

// Made with Bob