/**
 * EscalationDisplay Component
 * Displays escalation recommendations based on severity and impact
 */

import { Tile, Tag } from '@carbon/react';
import { UserFollow, Time, WarningAlt } from '@carbon/icons-react';
import { SeverityLevel } from '@/types/ticket';

interface EscalationDisplayProps {
  severity: SeverityLevel;
  productArea: string;
  className?: string;
}

/**
 * Determines escalation path based on severity
 */
function getEscalationPath(severity: SeverityLevel) {
  const paths: Record<SeverityLevel, {
    shouldEscalate: boolean;
    urgency: string;
    escalateTo: string[];
    timeline: string;
    reason: string;
    color: string;
  }> = {
    Critical: {
      shouldEscalate: true,
      urgency: 'Immediate',
      escalateTo: ['Engineering Manager', 'VP Engineering', 'On-Call Engineer'],
      timeline: 'Escalate immediately',
      reason: 'Service disruption affecting all users requires immediate executive attention',
      color: 'red'
    },
    High: {
      shouldEscalate: true,
      urgency: 'High',
      escalateTo: ['Team Lead', 'Engineering Manager', 'Product Manager'],
      timeline: 'Escalate within 1 hour',
      reason: 'Significant customer impact requires senior engineering involvement',
      color: 'orange'
    },
    Medium: {
      shouldEscalate: false,
      urgency: 'Standard',
      escalateTo: ['Team Lead'],
      timeline: 'Escalate if unresolved after 4 hours',
      reason: 'Monitor progress and escalate if resolution is delayed',
      color: 'yellow'
    },
    Low: {
      shouldEscalate: false,
      urgency: 'Low',
      escalateTo: ['Team Lead'],
      timeline: 'Escalate if unresolved after 24 hours',
      reason: 'Standard workflow - escalate only if blocked',
      color: 'green'
    }
  };

  return paths[severity];
}

/**
 * Get team contacts based on product area
 */
function getTeamContacts(productArea: string): string[] {
  const contacts: Record<string, string[]> = {
    Authentication: ['@auth-team', '#auth-incidents'],
    Billing: ['@billing-team', '#billing-support'],
    API: ['@api-team', '#api-incidents'],
    Performance: ['@platform-team', '#performance'],
    Database: ['@data-team', '#database-ops'],
    UI: ['@frontend-team', '#ui-bugs']
  };

  return contacts[productArea] || ['@engineering', '#incidents'];
}

export default function EscalationDisplay({ 
  severity, 
  productArea,
  className = '' 
}: EscalationDisplayProps) {
  const escalation = getEscalationPath(severity);
  const teamContacts = getTeamContacts(productArea);

  return (
    <div className={`escalation-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserFollow size={24} className="text-orange-600" />
          <h3 className="text-lg font-semibold">Escalation Path</h3>
        </div>

        {/* Escalation Status */}
        <div className={`p-4 rounded-lg mb-4 ${
          escalation.shouldEscalate 
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
        }`}>
          <div className="flex items-start gap-3">
            {escalation.shouldEscalate && (
              <WarningAlt size={24} className="text-red-600 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Tag type={escalation.shouldEscalate ? 'red' : 'green'} size="md">
                  {escalation.shouldEscalate ? 'Escalation Required' : 'Standard Process'}
                </Tag>
                <Tag type="outline" size="sm">
                  {escalation.urgency} Priority
                </Tag>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {escalation.reason}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Time size={20} className="text-blue-600" />
            <h4 className="font-semibold text-sm">Timeline</h4>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 ml-7">
            {escalation.timeline}
          </p>
        </div>

        {/* Escalation Contacts */}
        {escalation.shouldEscalate && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm mb-2">Escalate To:</h4>
            <div className="space-y-2">
              {escalation.escalateTo.map((contact, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {contact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Contacts */}
        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-2">Team Contacts:</h4>
          <div className="flex flex-wrap gap-2">
            {teamContacts.map((contact, index) => (
              <Tag key={index} type="blue" size="sm">
                {contact}
              </Tag>
            ))}
          </div>
        </div>

        {/* Escalation Checklist */}
        {escalation.shouldEscalate && (
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-sm mb-2 text-orange-800 dark:text-orange-200">
              Before Escalating:
            </h4>
            <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
              <li>Gather all relevant error logs and screenshots</li>
              <li>Document reproduction steps</li>
              <li>Estimate number of affected users</li>
              <li>Prepare business impact summary</li>
              <li>List attempted troubleshooting steps</li>
            </ul>
          </div>
        )}

        {/* Communication Template */}
        {escalation.shouldEscalate && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
              View escalation message template
            </summary>
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`${severity} Priority Escalation

Product Area: ${productArea}
Severity: ${severity}
Timeline: ${escalation.timeline}

Issue Summary:
[Brief description of the issue]

Impact:
[Number of affected users and business impact]

Current Status:
[What has been tried so far]

Next Steps:
[Immediate actions needed]

Contact: [Your name/team]`}
              </pre>
            </div>
          </details>
        )}
      </Tile>
    </div>
  );
}

// Made with Bob
