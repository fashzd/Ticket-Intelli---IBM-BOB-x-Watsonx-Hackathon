/**
 * TimeEstimateDisplay Component
 * Displays time estimates and efficiency metrics
 */

import { Tile, ProgressBar } from '@carbon/react';
import { Time, ChartLine, Rocket } from '@carbon/icons-react';

interface TimeEstimateDisplayProps {
  estimatedTimeSaved: string;
  confidenceScore: number;
  className?: string;
}

/**
 * Parse time saved string to minutes
 */
function parseTimeSaved(timeString: string): number {
  const match = timeString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/**
 * Calculate efficiency metrics
 */
function calculateMetrics(timeSaved: number) {
  const manualTriageTime = 45; // Average manual triage time in minutes
  const percentageSaved = Math.round((timeSaved / manualTriageTime) * 100);
  const hoursPerWeek = (timeSaved * 20) / 60; // Assuming 20 tickets per week
  const hoursPerMonth = hoursPerWeek * 4;

  return {
    manualTriageTime,
    percentageSaved,
    hoursPerWeek: hoursPerWeek.toFixed(1),
    hoursPerMonth: hoursPerMonth.toFixed(1)
  };
}

export default function TimeEstimateDisplay({ 
  estimatedTimeSaved,
  confidenceScore,
  className = '' 
}: TimeEstimateDisplayProps) {
  const timeSavedMinutes = parseTimeSaved(estimatedTimeSaved);
  const metrics = calculateMetrics(timeSavedMinutes);
  const confidencePercentage = Math.round(confidenceScore * 100);

  return (
    <div className={`time-estimate-display ${className}`}>
      <Tile className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Time size={24} className="text-purple-600" />
          <h3 className="text-lg font-semibold">Time & Efficiency</h3>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Time Saved */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Rocket size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Time Saved
              </span>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-1">
              {timeSavedMinutes} min
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              vs. {metrics.manualTriageTime} min manual triage
            </p>
          </div>

          {/* Confidence Score */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <ChartLine size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Confidence Score
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {confidencePercentage}%
            </p>
            <ProgressBar
              label="Confidence"
              value={confidencePercentage}
              max={100}
              size="small"
              className="mb-1"
              hideLabel
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {confidencePercentage >= 80 ? 'High confidence' : 
               confidencePercentage >= 60 ? 'Moderate confidence' : 
               'Review recommended'}
            </p>
          </div>
        </div>

        {/* Efficiency Comparison */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Efficiency Comparison</h4>
          <div className="space-y-3">
            {/* Manual Process */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  Manual Triage Process
                </span>
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  {metrics.manualTriageTime} min
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gray-400 h-2 rounded-full"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* AI-Assisted Process */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  AI-Assisted Triage
                </span>
                <span className="text-xs font-semibold text-purple-600">
                  {metrics.manualTriageTime - timeSavedMinutes} min
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${100 - metrics.percentageSaved}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-purple-600 font-semibold mt-2">
            {metrics.percentageSaved}% faster with AI assistance
          </p>
        </div>

        {/* Projected Savings */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-3">
            Projected time savings
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Per Week (20 tickets)
              </p>
              <p className="text-2xl font-bold text-green-600">
                {metrics.hoursPerWeek}h
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Per Month (80 tickets)
              </p>
              <p className="text-2xl font-bold text-green-600">
                {metrics.hoursPerMonth}h
              </p>
            </div>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-3">
            At $50/hour, that is <strong>${(parseFloat(metrics.hoursPerMonth) * 50).toFixed(0)}/month</strong> in saved labor costs.
          </p>
        </div>

        {/* Confidence Factors */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
            What affects confidence score?
          </summary>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>Detailed ticket description (+15%)</li>
              <li>Error messages or codes (+10%)</li>
              <li>Reproduction steps (+10%)</li>
              <li>Environment information (+10%)</li>
              <li>Timing information (+5%)</li>
              <li>Impact metrics (+5%)</li>
              <li>Matches known patterns (+10%)</li>
            </ul>
          </div>
        </details>
      </Tile>
    </div>
  );
}

// Made with Bob
