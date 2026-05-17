'use client';

import { InlineNotification } from '@carbon/react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  title?: string;
  kind?: 'error' | 'warning' | 'info';
}

export default function ErrorMessage({ 
  message, 
  onClose,
  title = 'Error',
  kind = 'error'
}: ErrorMessageProps) {
  return (
    <div className="my-4" role="alert" aria-live="assertive">
      <InlineNotification
        kind={kind}
        title={title}
        subtitle={message}
        onClose={onClose}
        onCloseButtonClick={onClose}
        hideCloseButton={!onClose}
        lowContrast={false}
        aria-label={`${kind} notification: ${title}`}
      />
    </div>
  );
}

// Made with Bob