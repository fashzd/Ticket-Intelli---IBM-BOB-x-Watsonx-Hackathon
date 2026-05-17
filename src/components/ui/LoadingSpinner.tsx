'use client';

import { Loading } from '@carbon/react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LoadingSpinner Component
 * 
 * Displays a loading indicator with optional message.
 * Uses Carbon Design System Loading component.
 */
export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-live="polite">
      <Loading 
        description={message}
        withOverlay={false}
        small={size === 'sm'}
      />
      {message && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
      )}
    </div>
  );
}

// Made with Bob