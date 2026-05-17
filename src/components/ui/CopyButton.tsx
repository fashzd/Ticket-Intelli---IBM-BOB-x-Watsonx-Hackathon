'use client';

import { useState } from 'react';
import { Button } from '@carbon/react';
import { Copy, Checkmark } from '@carbon/icons-react';

/**
 * CopyButton Component
 * 
 * Button that copies text to clipboard with visual feedback.
 * Shows checkmark icon briefly after successful copy.
 */

interface CopyButtonProps {
  text: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  kind?: 'primary' | 'secondary' | 'tertiary' | 'ghost';
  className?: string;
}

export default function CopyButton({ 
  text, 
  label = 'Copy',
  size = 'sm',
  kind = 'ghost',
  className = ''
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Button
      kind={kind}
      size={size}
      renderIcon={copied ? Checkmark : Copy}
      onClick={handleCopy}
      className={`transition-all ${className}`}
      aria-label={copied ? 'Copied!' : `Copy ${label}`}
      hasIconOnly={!label}
    >
      {copied ? 'Copied!' : label}
    </Button>
  );
}

// Made with Bob