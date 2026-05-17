/**
 * SeverityDisplay Component
 * Displays ticket severity level with visual indicators and color coding
 * Optimized with React.memo
 */

import { memo } from 'react';
import { Tag } from '@carbon/react';
import { WarningAlt, ErrorFilled, Checkmark, Information } from '@carbon/icons-react';
import { SeverityLevel } from '@/types/ticket';

interface SeverityDisplayProps {
  severity: SeverityLevel;
  className?: string;
}

/**
 * Maps severity levels to Carbon Design System tag types and colors
 */
const severityConfig: Record<SeverityLevel, {
  type: 'red' | 'magenta' | 'purple' | 'blue' | 'cyan' | 'teal' | 'green' | 'gray' | 'cool-gray' | 'warm-gray' | 'high-contrast' | 'outline';
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  description: string;
}> = {
  Critical: {
    type: 'red',
    icon: ErrorFilled,
    label: 'Critical',
    description: 'Immediate action required - Service disruption affecting all users'
  },
  High: {
    type: 'magenta',
    icon: WarningAlt,
    label: 'High',
    description: 'Urgent attention needed - Significant impact on operations'
  },
  Medium: {
    type: 'purple',
    icon: Information,
    label: 'Medium',
    description: 'Moderate priority - Affects some users or functionality'
  },
  Low: {
    type: 'green',
    icon: Checkmark,
    label: 'Low',
    description: 'Low priority - Minor issue or enhancement request'
  }
};

function SeverityDisplay({ severity, className = '' }: SeverityDisplayProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <div className={`severity-display ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <Tag type={config.type} size="md" className="flex items-center gap-2">
          <Icon size={16} />
          <span className="font-semibold">{config.label} Priority</span>
        </Tag>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {config.description}
      </p>
    </div>
  );
}

// Export memoized version for performance
export default memo(SeverityDisplay);

// Made with Bob
