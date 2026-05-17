/**
 * BusinessImpactDisplay Component
 * Displays business impact analysis with metrics and context
 * Optimized with React.memo
 */

import { memo } from 'react';
import { Tile } from '@carbon/react';
import { ChartLine, UserMultiple, Currency } from '@carbon/icons-react';

interface BusinessImpactDisplayProps {
  businessImpact: string;
  className?: string;
}

/**
 * Extracts metrics from business impact text
 */
function extractMetrics(text: string): {
  users?: string;
  revenue?: string;
  hasMetrics: boolean;
} {
  const userMatch = text.match(/(\d+[,\d]*)\s+users/i);
  const revenueMatch = text.match(/\$(\d+[,\d]*)/);
  
  return {
    users: userMatch ? userMatch[1] : undefined,
    revenue: revenueMatch ? revenueMatch[1] : undefined,
    hasMetrics: !!(userMatch || revenueMatch)
  };
}

function BusinessImpactDisplay({
  businessImpact,
  className = ''
}: BusinessImpactDisplayProps) {
  const metrics = extractMetrics(businessImpact);

  return (
    <div className={`business-impact-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChartLine size={24} className="text-blue-600" />
          <h3 className="text-lg font-semibold">Business Impact</h3>
        </div>

        {/* Metrics Cards */}
        {metrics.hasMetrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {metrics.users && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <UserMultiple size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Affected Users
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {metrics.users}
                </p>
              </div>
            )}
            
            {metrics.revenue && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Currency size={20} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Revenue Impact
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  ${metrics.revenue}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Impact Description */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {businessImpact}
          </p>
        </div>
      </Tile>
    </div>
  );
}

// Export memoized version for performance
export default memo(BusinessImpactDisplay);

// Made with Bob
