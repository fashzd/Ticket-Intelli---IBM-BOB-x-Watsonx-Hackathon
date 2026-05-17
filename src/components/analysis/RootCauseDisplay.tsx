/**
 * RootCauseDisplay Component
 * Displays identified root causes with priority indicators
 */

import { Tile, OrderedList, ListItem } from '@carbon/react';
import { Debug, ChevronRight } from '@carbon/icons-react';

interface RootCauseDisplayProps {
  rootCauses: string[];
  className?: string;
}

/**
 * Determines priority level based on position in list
 */
function getPriorityLevel(index: number, total: number): {
  label: string;
  color: string;
} {
  if (index === 0) {
    return { label: 'Most Likely', color: 'text-red-600 dark:text-red-400' };
  } else if (index === 1 && total > 2) {
    return { label: 'Likely', color: 'text-orange-600 dark:text-orange-400' };
  } else {
    return { label: 'Possible', color: 'text-yellow-600 dark:text-yellow-400' };
  }
}

export default function RootCauseDisplay({ 
  rootCauses, 
  className = '' 
}: RootCauseDisplayProps) {
  if (!rootCauses || rootCauses.length === 0) {
    return null;
  }

  return (
    <div className={`root-cause-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Debug size={24} className="text-purple-600" />
          <h3 className="text-lg font-semibold">Possible Root Causes</h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Based on ticket analysis, these are the most likely root causes ordered by probability:
        </p>

        <OrderedList className="space-y-3">
          {rootCauses.map((cause, index) => {
            const priority = getPriorityLevel(index, rootCauses.length);
            
            return (
              <ListItem key={index} className="mb-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <ChevronRight size={16} className="mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        {cause}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${priority.color} ml-6`}>
                    {priority.label}
                  </span>
                </div>
              </ListItem>
            );
          })}
        </OrderedList>

        {rootCauses.length > 3 && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Tip:</strong> Start investigation with the top 2-3 causes for fastest resolution.
            </p>
          </div>
        )}
      </Tile>
    </div>
  );
}

// Made with Bob
