/**
 * EngineeringHandoffDisplay Component
 * Displays technical handoff summary with copy functionality
 */

import { useState } from 'react';
import { Tile, Button, CodeSnippet } from '@carbon/react';
import { DocumentExport, Copy, Checkmark } from '@carbon/icons-react';

interface EngineeringHandoffDisplayProps {
  handoffSummary: string;
  className?: string;
}

export default function EngineeringHandoffDisplay({ 
  handoffSummary, 
  className = '' 
}: EngineeringHandoffDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!handoffSummary) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(handoffSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Parse markdown-style formatting for better display
  const formatHandoff = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Bold headers
      if (line.startsWith('**') && line.endsWith('**')) {
        const content = line.slice(2, -2);
        return (
          <h4 key={index} className="font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
            {content}
          </h4>
        );
      }
      
      // Bold inline text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 mb-2">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      
      // List items
      if (line.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-700 dark:text-gray-300 ml-4 mb-1">
            {line.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      
      if (line.startsWith('-')) {
        return (
          <li key={index} className="text-gray-700 dark:text-gray-300 ml-4 mb-1 list-disc">
            {line.replace(/^-\s*/, '')}
          </li>
        );
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />;
      }
      
      // Regular text
      return (
        <p key={index} className="text-gray-700 dark:text-gray-300 mb-2">
          {line}
        </p>
      );
    });
  };

  return (
    <div className={`engineering-handoff-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DocumentExport size={24} className="text-indigo-600" />
            <h3 className="text-lg font-semibold">Engineering Handoff</h3>
          </div>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={copied ? Checkmark : Copy}
            onClick={handleCopy}
            iconDescription={copied ? 'Copied!' : 'Copy to clipboard'}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Technical summary ready for engineering team handoff. Copy this to your ticket system or Slack.
        </p>

        {/* Formatted Display */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
          <div className="prose prose-sm max-w-none">
            {formatHandoff(handoffSummary)}
          </div>
        </div>

        {/* Raw Text View (Collapsible) */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline">
            View raw text
          </summary>
          <CodeSnippet 
            type="multi" 
            feedback="Copied to clipboard"
            className="mt-2"
          >
            {handoffSummary}
          </CodeSnippet>
        </details>

        {/* Usage Tip */}
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <p className="text-sm text-indigo-800 dark:text-indigo-200">
            <strong>Tip:</strong> This summary includes ticket context, root causes, and investigation starting points.
          </p>
        </div>
      </Tile>
    </div>
  );
}

// Made with Bob
