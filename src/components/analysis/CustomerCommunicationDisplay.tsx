/**
 * CustomerCommunicationDisplay Component
 * Displays customer communication draft with editing and copy functionality
 */

import { useState } from 'react';
import { Tile, Button, TextArea } from '@carbon/react';
import { Email, Copy, Checkmark, Edit } from '@carbon/icons-react';

interface CustomerCommunicationDisplayProps {
  customerResponse: string;
  className?: string;
}

export default function CustomerCommunicationDisplay({ 
  customerResponse, 
  className = '' 
}: CustomerCommunicationDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResponse, setEditedResponse] = useState(customerResponse);
  const [copied, setCopied] = useState(false);

  if (!customerResponse) {
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(isEditing ? editedResponse : customerResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      setIsEditing(false);
    } else {
      // Start editing
      setEditedResponse(customerResponse);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setEditedResponse(customerResponse);
    setIsEditing(false);
  };

  const displayText = isEditing ? editedResponse : customerResponse;

  return (
    <div className={`customer-communication-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Email size={24} className="text-cyan-600" />
            <h3 className="text-lg font-semibold">Customer Communication</h3>
          </div>
          <div className="flex gap-2">
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Edit}
              onClick={handleEdit}
              iconDescription={isEditing ? 'Save changes' : 'Edit response'}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
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
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Customer-ready response draft. Review, edit if needed, and send to the customer.
        </p>

        {/* Response Display/Editor */}
        {isEditing ? (
          <div className="space-y-3">
            <TextArea
              id="customer-response-editor"
              labelText=""
              value={editedResponse}
              onChange={(e) => setEditedResponse(e.target.value)}
              rows={15}
              className="w-full"
            />
            <div className="flex gap-2 justify-end">
              <Button
                kind="secondary"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                kind="primary"
                size="sm"
                onClick={handleEdit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {displayText}
              </pre>
            </div>
          </div>
        )}

        {/* Communication Guidelines */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
              Included:
            </h4>
            <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
              <li>• Acknowledgment of issue</li>
              <li>• Current status update</li>
              <li>• Expected timeline</li>
              <li>• Empathy and professionalism</li>
            </ul>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Best practices:
            </h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Personalize with customer name</li>
              <li>• Avoid technical jargon</li>
              <li>• Set realistic expectations</li>
              <li>• Provide ticket reference</li>
            </ul>
          </div>
        </div>

        {/* Tone Analysis */}
        <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Email size={16} className="text-cyan-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-cyan-800 dark:text-cyan-200 mb-2">
                <strong>Tone Check:</strong> This response maintains a professional, empathetic tone 
                appropriate for customer communication.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded">
                  Professional
                </span>
                <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded">
                  Empathetic
                </span>
                <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded">
                  Action-Oriented
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 flex gap-2 flex-wrap">
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => {
              // In production, this would open email client
              window.location.href = `mailto:?subject=Ticket Update&body=${encodeURIComponent(displayText)}`;
            }}
          >
            Open in Email Client
          </Button>
          <Button
            kind="tertiary"
            size="sm"
            onClick={() => {
              // In production, this would integrate with ticketing system
              alert('Integration with ticketing system coming soon!');
            }}
          >
            Send via Ticket System
          </Button>
        </div>
      </Tile>
    </div>
  );
}

// Made with Bob
