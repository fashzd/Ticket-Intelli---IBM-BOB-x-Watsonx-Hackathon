import { SampleTicket, TicketAnalysis } from "@/types/ticket";

/**
 * Sample tickets for testing
 */
export const sampleTickets: SampleTicket[] = [
  {
    id: "TICK-001",
    title: "Login page not loading",
    description: "When I try to access the login page, I get a blank white screen. This started happening after the latest update yesterday. I've tried clearing my cache and using different browsers (Chrome, Firefox, Safari) but the issue persists. This is blocking me from accessing my account and I have urgent work to complete.",
    customerName: "Acme Corp",
    submittedDate: "2026-05-16T14:30:00Z"
  },
  {
    id: "TICK-002",
    title: "Payment processing fails intermittently",
    description: "Our customers are reporting that payment processing fails about 30% of the time. When it fails, they see an error message 'Transaction could not be completed. Please try again.' We've lost several sales because of this. The issue seems to happen more frequently during peak hours (2-4 PM EST). Our payment gateway logs show timeout errors.",
    customerName: "ShopFast Inc",
    submittedDate: "2026-05-16T09:15:00Z"
  },
  {
    id: "TICK-003",
    title: "Dashboard charts showing incorrect data",
    description: "The analytics dashboard is displaying incorrect revenue figures. The total revenue shown is about 20% lower than what our accounting system reports. This discrepancy started appearing last week. The individual transaction data looks correct, but the aggregated totals are wrong. This is affecting our monthly reporting.",
    customerName: "DataViz Solutions",
    submittedDate: "2026-05-15T16:45:00Z"
  }
];

/**
 * Mock analysis response generator
 */
export function generateMockAnalysis(ticketText: string): TicketAnalysis {
  // Simple heuristic-based mock response
  const hasUrgentKeywords = /urgent|critical|blocking|down|not working|fails/i.test(ticketText);
  const hasPaymentKeywords = /payment|transaction|checkout|billing/i.test(ticketText);
  const hasDataKeywords = /data|report|analytics|dashboard/i.test(ticketText);
  const hasAuthKeywords = /login|authentication|access|password/i.test(ticketText);

  let severity: TicketAnalysis["severity"] = "Medium";
  let productArea = "General";
  let rootCauses: string[] = [];
  let nextSteps: string[] = [];

  if (hasUrgentKeywords) {
    severity = "High";
  }
  if (hasPaymentKeywords) {
    severity = "Critical";
    productArea = "Payment Processing";
    rootCauses = [
      "Payment gateway timeout issues",
      "Database connection pool exhaustion during peak load",
      "Insufficient error handling in payment service"
    ];
    nextSteps = [
      "Check payment gateway logs for timeout patterns",
      "Review database connection pool configuration",
      "Implement retry logic with exponential backoff"
    ];
  } else if (hasAuthKeywords) {
    severity = "High";
    productArea = "Authentication & Authorization";
    rootCauses = [
      "Recent deployment may have broken authentication flow",
      "CDN caching issues preventing login page assets from loading",
      "Session management service experiencing issues"
    ];
    nextSteps = [
      "Roll back recent authentication changes",
      "Clear CDN cache for login page assets",
      "Check session service health and logs"
    ];
  } else if (hasDataKeywords) {
    severity = "Medium";
    productArea = "Analytics & Reporting";
    rootCauses = [
      "Data aggregation query using incorrect date range",
      "Missing data from recent ETL pipeline run",
      "Caching layer serving stale data"
    ];
    nextSteps = [
      "Review aggregation query logic",
      "Verify ETL pipeline completion status",
      "Clear analytics cache and regenerate reports"
    ];
  }

  return {
    severity,
    businessImpact: hasPaymentKeywords
      ? "Direct revenue loss due to failed transactions. Customer trust and satisfaction at risk. Estimated $10K-50K daily revenue impact."
      : hasAuthKeywords
      ? "Complete service unavailability for affected users. Productivity loss and potential customer churn. High visibility issue."
      : "Data integrity concerns affecting business decisions. Reporting delays impacting stakeholder confidence.",
    likelyProductArea: productArea,
    possibleRootCauses: rootCauses.length > 0 ? rootCauses : [
      "Recent code deployment may have introduced regression",
      "Infrastructure or dependency issue",
      "Configuration change not properly tested"
    ],
    engineeringHandoffSummary: `${severity} severity issue in ${productArea}. ${hasPaymentKeywords ? "Payment processing failures" : hasAuthKeywords ? "Authentication service disruption" : "Data accuracy concerns"} affecting customer operations. Requires immediate investigation.`,
    recommendedNextSteps: nextSteps.length > 0 ? nextSteps : [
      "Reproduce the issue in staging environment",
      "Review recent code changes and deployments",
      "Check system logs and monitoring dashboards",
      "Engage relevant engineering team for investigation"
    ],
    regressionTestSuggestions: [
      `End-to-end test for ${productArea.toLowerCase()} workflow`,
      "Load testing under peak traffic conditions",
      "Cross-browser compatibility testing",
      "Integration testing with dependent services"
    ],
    customerResponseDraft: `Dear Customer,

Thank you for reporting this issue. We understand the impact this is having on your operations and have escalated this to our engineering team as a ${severity.toLowerCase()} priority.

Our initial analysis indicates this may be related to ${rootCauses[0] || "recent system changes"}. We are actively investigating and will provide updates every 4 hours until resolved.

Expected timeline for resolution: ${severity === "Critical" ? "2-4 hours" : severity === "High" ? "4-8 hours" : "24-48 hours"}

We apologize for the inconvenience and appreciate your patience.

Best regards,
Support Team`,
    confidenceScore: 0.85,
    estimatedTriageTimeSaved: "45 minutes"
  };
}

// Made with Bob
