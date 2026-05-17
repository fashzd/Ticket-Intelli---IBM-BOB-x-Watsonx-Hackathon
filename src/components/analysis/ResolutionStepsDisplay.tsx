/**
 * ResolutionStepsDisplay Component
 * Displays recommended next steps as an interactive checklist
 */

import { useState } from 'react';
import { Tile, Checkbox } from '@carbon/react';
import { TaskComplete, Checkmark } from '@carbon/icons-react';

interface ResolutionStepsDisplayProps {
  steps: string[];
  className?: string;
}

export default function ResolutionStepsDisplay({ 
  steps, 
  className = '' 
}: ResolutionStepsDisplayProps) {
  // Track completed steps (for demo purposes - not persisted)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  if (!steps || steps.length === 0) {
    return null;
  }

  const handleStepToggle = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const completionPercentage = Math.round((completedSteps.size / steps.length) * 100);

  return (
    <div className={`resolution-steps-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TaskComplete size={24} className="text-green-600" />
            <h3 className="text-lg font-semibold">Recommended Next Steps</h3>
          </div>
          {completedSteps.size > 0 && (
            <div className="flex items-center gap-2">
              <Checkmark size={20} className="text-green-600" />
              <span className="text-sm font-semibold text-green-600">
                {completedSteps.size}/{steps.length} Complete
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {completedSteps.size > 0 && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Follow these steps in order for efficient resolution. Check off steps as you complete them.
        </p>

        {/* Steps Checklist */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            
            return (
              <div 
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                  isCompleted 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <Checkbox
                  id={`step-${index}`}
                  checked={isCompleted}
                  onChange={() => handleStepToggle(index)}
                  labelText=""
                  className="flex-shrink-0 mt-1"
                />
                <label 
                  htmlFor={`step-${index}`}
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <span className={`text-xs font-bold ${
                      isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {index + 1}.
                    </span>
                    <p className={`text-sm leading-relaxed ${
                      isCompleted 
                        ? 'text-gray-600 dark:text-gray-400 line-through' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {step}
                    </p>
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedSteps.size === steps.length && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <Checkmark size={20} className="text-green-600" />
              <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                All steps completed! Ready to verify resolution.
              </p>
            </div>
          </div>
        )}
      </Tile>
    </div>
  );
}

// Made with Bob
