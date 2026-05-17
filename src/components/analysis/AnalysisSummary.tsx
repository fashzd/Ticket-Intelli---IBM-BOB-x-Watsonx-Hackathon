/**
 * AnalysisSummary Component
 * Main container component that orchestrates all analysis display components
 * Optimized with React.memo for performance
 */

import { memo } from 'react';
import { TicketAnalysis } from '@/types/ticket';
import SeverityDisplay from './SeverityDisplay';
import BusinessImpactDisplay from './BusinessImpactDisplay';
import RootCauseDisplay from './RootCauseDisplay';
import ResolutionStepsDisplay from './ResolutionStepsDisplay';
import EngineeringHandoffDisplay from './EngineeringHandoffDisplay';
import SimilarTicketsDisplay from './SimilarTicketsDisplay';
import EscalationDisplay from './EscalationDisplay';
import CustomerCommunicationDisplay from './CustomerCommunicationDisplay';
import TimeEstimateDisplay from './TimeEstimateDisplay';
import { Accordion, AccordionItem } from '@carbon/react';
import { Checkmark, DocumentExport, TaskComplete, View } from '@carbon/icons-react';

interface AnalysisSummaryProps {
  analysis: TicketAnalysis;
  className?: string;
}

function AnalysisSummary({
  analysis,
  className = ''
}: AnalysisSummaryProps) {
  if (!analysis) {
    return null;
  }

  return (
    <div className={`analysis-summary ${className} fade-in`}>
      {/* Quick Overview Grid */}
      <div className="analysis-overview">
        <div className="surface-panel analysis-overview__severity">
          <div className="section-kicker">Priority</div>
          <SeverityDisplay severity={analysis.severity} />
        </div>
        <div className="analysis-overview__efficiency">
          <TimeEstimateDisplay 
            estimatedTimeSaved={analysis.estimatedTriageTimeSaved}
            confidenceScore={analysis.confidenceScore}
          />
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="space-y-6 md:space-y-8">
        {/* Business Impact */}
        <BusinessImpactDisplay businessImpact={analysis.businessImpact} />

        {/* Root Causes */}
        <RootCauseDisplay rootCauses={analysis.possibleRootCauses} />

        {/* Resolution Steps */}
        <ResolutionStepsDisplay steps={analysis.recommendedNextSteps} />

        {/* Engineering Handoff */}
        <EngineeringHandoffDisplay 
          handoffSummary={analysis.engineeringHandoffSummary} 
        />

        {/* Collapsible Additional Sections */}
        <Accordion>
          {/* Escalation Path */}
          <AccordionItem title="Escalation Path & Team Contacts">
            <EscalationDisplay 
              severity={analysis.severity}
              productArea={analysis.likelyProductArea}
            />
          </AccordionItem>

          {/* Similar Tickets */}
          <AccordionItem title="Similar Tickets & Historical Context">
            <SimilarTicketsDisplay 
              productArea={analysis.likelyProductArea}
            />
          </AccordionItem>

          {/* Customer Communication */}
          <AccordionItem title="Customer Communication Draft">
            <CustomerCommunicationDisplay 
              customerResponse={analysis.customerResponseDraft}
            />
          </AccordionItem>

          {/* Regression Tests */}
          <AccordionItem title="Regression Test Suggestions">
            <div className="p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Recommended test cases to prevent this issue from recurring:
              </p>
              <div className="space-y-2">
                {analysis.regressionTestSuggestions.map((test, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-xs font-bold text-blue-600 mt-1">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                      {test}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Footer Actions */}
      <div className="surface-panel result-next-steps">
        <h3>Recommended operator flow</h3>
        <div className="result-next-steps__grid">
          <div>
            <View size={20} />
            <strong>Review</strong>
            <p>Confirm the generated severity, impact, and likely product area.</p>
          </div>
          <div>
            <DocumentExport size={20} />
            <strong>Handoff</strong>
            <p>Copy the engineering summary into the incident or ticket thread.</p>
          </div>
          <div>
            <TaskComplete size={20} />
            <strong>Resolve</strong>
            <p>Work through the checklist and update the customer draft as facts change.</p>
          </div>
        </div>
      </div>

      <div className="analysis-disclaimer">
        <Checkmark size={16} />
        <span>Review AI-generated content before sending it to customers or engineering.</span>
      </div>
    </div>
  );
}

// Export memoized version for performance optimization
export default memo(AnalysisSummary);

// Made with Bob
