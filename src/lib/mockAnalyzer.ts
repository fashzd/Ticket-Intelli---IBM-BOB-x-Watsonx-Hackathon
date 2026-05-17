/**
 * Mock Ticket Analyzer
 * Simulates AI analysis using keyword-based heuristics
 * Produces all 10 required analysis outputs
 */

import { SampleTicket, SeverityLevel, TicketAnalysis } from "@/types/ticket";
import {
  SEVERITY_KEYWORDS,
  PRODUCT_AREA_KEYWORDS,
  ROOT_CAUSE_PATTERNS,
  BUSINESS_IMPACT_TEMPLATES,
  NEXT_STEP_TEMPLATES,
  CONFIDENCE_FACTORS,
  TIME_SAVED_MINUTES,
} from "./constants";

/**
 * Helper: Count keyword matches in text
 */
function countMatches(text: string, keywords: string[]): number {
  let count = 0;
  keywords.forEach((keyword) => {
    const regex = new RegExp(keyword, "gi");
    const matches = text.match(regex);
    if (matches) count += matches.length;
  });
  return count;
}

/**
 * 1. Analyze Severity
 * Determines ticket severity based on keyword matching
 */
export function analyzeSeverity(ticket: SampleTicket): SeverityLevel {
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();

  // Count matches for each severity level
  const scores: Record<SeverityLevel, number> = {
    Critical: countMatches(text, SEVERITY_KEYWORDS.Critical),
    High: countMatches(text, SEVERITY_KEYWORDS.High),
    Medium: countMatches(text, SEVERITY_KEYWORDS.Medium),
    Low: countMatches(text, SEVERITY_KEYWORDS.Low),
  };

  // Find highest scoring severity
  let maxScore = 0;
  let severity: SeverityLevel = "Medium"; // Default

  (Object.keys(scores) as SeverityLevel[]).forEach((level) => {
    if (scores[level] > maxScore) {
      maxScore = scores[level];
      severity = level;
    }
  });

  // If no matches, use heuristics
  if (maxScore === 0) {
    if (text.includes("?") && !text.includes("not") && !text.includes("fail")) {
      severity = "Low";
    } else if (text.length < 100) {
      severity = "Low";
    } else {
      severity = "Medium";
    }
  }

  return severity;
}

/**
 * 2. Calculate Business Impact
 * Estimates affected users and revenue impact
 */
export function calculateBusinessImpact(
  ticket: SampleTicket,
  severity: SeverityLevel
): string {
  const template = BUSINESS_IMPACT_TEMPLATES[severity];
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();

  // Estimate affected users (random within range)
  const userRange = template.userRange;
  const affectedUsers = Math.floor(
    Math.random() * (userRange[1] - userRange[0]) + userRange[0]
  );

  // Estimate revenue impact (random within range)
  const revenueRange = template.revenueRange;
  const revenueImpact = Math.floor(
    Math.random() * (revenueRange[1] - revenueRange[0]) + revenueRange[0]
  );

  // Build impact description
  let impact = template.description;

  // Add specific metrics
  if (severity === "Critical" || severity === "High") {
    impact += ` Approximately ${affectedUsers.toLocaleString()} users affected.`;
    if (revenueImpact > 0) {
      impact += ` Estimated revenue impact: $${revenueImpact.toLocaleString()}/day.`;
    }
  }

  // Add context-specific details
  if (text.includes("payment") || text.includes("transaction")) {
    impact += " Direct impact on revenue generation and customer trust.";
  } else if (text.includes("login") || text.includes("access")) {
    impact += " Complete service unavailability for affected users.";
  } else if (text.includes("data") || text.includes("report")) {
    impact += " Business decision-making impaired by data accuracy concerns.";
  }

  return impact;
}

/**
 * 3. Detect Product Areas
 * Identifies all relevant product areas (multi-area detection)
 */
export function detectProductAreas(ticket: SampleTicket): string[] {
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();
  const detectedAreas: Array<{ area: string; score: number }> = [];

  // Score each product area
  Object.entries(PRODUCT_AREA_KEYWORDS).forEach(([area, keywords]) => {
    const score = countMatches(text, keywords);
    if (score > 0) {
      detectedAreas.push({ area, score });
    }
  });

  // Sort by score and return top areas
  detectedAreas.sort((a, b) => b.score - a.score);

  // Return top 3 areas, or at least 1
  const areas = detectedAreas.slice(0, 3).map((item) => item.area);
  return areas.length > 0 ? areas : ["General"];
}

/**
 * 4. Generate Root Causes
 * Suggests possible root causes with confidence levels
 */
export function generateRootCauses(
  ticket: SampleTicket,
  productAreas: string[]
): string[] {
  const rootCauses: string[] = [];
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();

  // Get root causes for each detected product area
  productAreas.forEach((area) => {
    const patterns = ROOT_CAUSE_PATTERNS[area] || [];
    if (patterns.length > 0) {
      // Select 2-3 relevant root causes per area
      const count = Math.min(2, patterns.length);
      for (let i = 0; i < count; i++) {
        rootCauses.push(patterns[i]);
      }
    }
  });

  // Add generic root causes if needed
  if (rootCauses.length === 0) {
    rootCauses.push(
      "Recent code deployment may have introduced regression",
      "Infrastructure or dependency service issue",
      "Configuration change not properly tested in staging"
    );
  }

  // Add context-specific root causes
  if (text.includes("after") && text.includes("update")) {
    rootCauses.unshift("Recent deployment introduced breaking change");
  }
  if (text.includes("intermittent") || text.includes("sometimes")) {
    rootCauses.push("Race condition or timing-dependent bug");
  }
  if (text.includes("peak") || text.includes("load")) {
    rootCauses.push("System unable to handle peak load conditions");
  }

  // Return unique root causes (max 5)
  return [...new Set(rootCauses)].slice(0, 5);
}

/**
 * 5. Create Handoff Summary
 * Generates engineering handoff brief
 */
export function createHandoffSummary(
  ticket: SampleTicket,
  severity: SeverityLevel,
  rootCauses: string[]
): string {
  const productAreas = detectProductAreas(ticket);
  const primaryArea = productAreas[0];
  const text = ticket.description.toLowerCase();

  let summary = `**${severity} Priority Issue - ${primaryArea}**\n\n`;

  // Add ticket context
  summary += `**Ticket:** ${ticket.id} - ${ticket.title}\n`;
  summary += `**Customer:** ${ticket.customerName}\n`;
  summary += `**Reported:** ${new Date(ticket.submittedDate).toLocaleString()}\n\n`;

  // Add problem statement
  summary += `**Problem Statement:**\n`;
  const firstSentence = ticket.description.split(".")[0];
  summary += `${firstSentence}.\n\n`;

  // Add likely root causes
  summary += `**Likely Root Causes:**\n`;
  rootCauses.slice(0, 3).forEach((cause, index) => {
    summary += `${index + 1}. ${cause}\n`;
  });
  summary += `\n`;

  // Add urgency context
  if (severity === "Critical") {
    summary += `**Urgency:** Immediate action required. Customer operations blocked.\n`;
  } else if (severity === "High") {
    summary += `**Urgency:** High priority. Significant customer impact.\n`;
  }

  // Add affected areas
  if (productAreas.length > 1) {
    summary += `**Related Systems:** ${productAreas.join(", ")}\n`;
  }

  // Add investigation hints
  summary += `\n**Investigation Starting Points:**\n`;
  if (text.includes("error") || text.includes("message")) {
    summary += `- Check error logs and stack traces\n`;
  }
  if (text.includes("after") || text.includes("since")) {
    summary += `- Review recent deployments and changes\n`;
  }
  if (text.includes("slow") || text.includes("timeout")) {
    summary += `- Analyze performance metrics and database queries\n`;
  }
  summary += `- Reproduce in staging environment\n`;

  return summary;
}

/**
 * 6. Suggest Next Steps
 * Provides prioritized action items
 */
export function suggestNextSteps(
  ticket: SampleTicket,
  severity: SeverityLevel,
  productAreas: string[]
): string[] {
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();
  const steps: string[] = [];

  // Immediate actions for critical/high severity
  if (severity === "Critical" || severity === "High") {
    steps.push(...NEXT_STEP_TEMPLATES.immediate.slice(0, 2));
  }

  // Investigation steps
  steps.push(...NEXT_STEP_TEMPLATES.investigation.slice(0, 2));

  // Area-specific steps
  if (productAreas.includes("Authentication")) {
    steps.push("Verify authentication service health and token validation");
  }
  if (productAreas.includes("Billing")) {
    steps.push("Check payment gateway logs and transaction status");
  }
  if (productAreas.includes("Database")) {
    steps.push("Analyze slow query logs and connection pool metrics");
  }
  if (productAreas.includes("Performance")) {
    steps.push("Review APM traces and identify performance bottlenecks");
  }

  // Context-specific steps
  if (text.includes("browser") || text.includes("chrome") || text.includes("firefox")) {
    steps.push("Test across different browsers and clear CDN cache");
  }
  if (text.includes("mobile") || text.includes("app")) {
    steps.push("Test on multiple mobile devices and OS versions");
  }
  if (text.includes("peak") || text.includes("load")) {
    steps.push("Run load tests to reproduce under similar traffic conditions");
  }

  // Mitigation steps for high severity
  if (severity === "Critical" || severity === "High") {
    steps.push(...NEXT_STEP_TEMPLATES.mitigation.slice(0, 1));
  }

  // Resolution steps
  steps.push(...NEXT_STEP_TEMPLATES.resolution.slice(0, 2));

  // Communication steps
  if (severity === "Critical" || severity === "High") {
    steps.push(NEXT_STEP_TEMPLATES.communication[0]);
  }

  // Return unique steps (max 8)
  return [...new Set(steps)].slice(0, 8);
}

/**
 * 7. Generate Regression Tests
 * Suggests test cases to prevent recurrence
 */
export function generateRegressionTests(
  ticket: SampleTicket,
  productAreas: string[]
): string[] {
  const text = `${ticket.title} ${ticket.description}`.toLowerCase();
  const tests: string[] = [];

  // Area-specific tests
  productAreas.forEach((area) => {
    switch (area) {
      case "Authentication":
        tests.push(
          "End-to-end test: Complete login flow with valid credentials",
          "Integration test: Token generation and validation",
          "Security test: Session timeout and invalidation"
        );
        break;
      case "Billing":
        tests.push(
          "End-to-end test: Complete payment processing flow",
          "Integration test: Payment gateway communication",
          "Unit test: Transaction state machine transitions"
        );
        break;
      case "API":
        tests.push(
          "Integration test: API endpoint response validation",
          "Performance test: API latency under load",
          "Unit test: Request/response serialization"
        );
        break;
      case "UI":
        tests.push(
          "End-to-end test: User interface interaction flow",
          "Accessibility test: WCAG compliance check",
          "Unit test: Component rendering with edge cases"
        );
        break;
      case "Database":
        tests.push(
          "Integration test: Database query performance",
          "Unit test: Data model validation and constraints",
          "Performance test: Connection pool under load"
        );
        break;
      case "Performance":
        tests.push(
          "Performance test: Load testing at peak capacity",
          "Performance test: Memory usage profiling",
          "Integration test: Caching layer effectiveness"
        );
        break;
      default:
        tests.push(`Integration test: ${area} core functionality`);
    }
  });

  // Context-specific tests
  if (text.includes("browser") || text.includes("chrome")) {
    tests.push("End-to-end test: Cross-browser compatibility testing");
  }
  if (text.includes("mobile")) {
    tests.push("End-to-end test: Mobile responsive design validation");
  }
  if (text.includes("data") || text.includes("report")) {
    tests.push("Integration test: Data accuracy and aggregation logic");
  }
  if (text.includes("intermittent") || text.includes("sometimes")) {
    tests.push("Performance test: Stress testing for race conditions");
  }

  // Generic tests
  tests.push(
    "End-to-end test: Happy path user workflow",
    "Integration test: Error handling and recovery",
    "Unit test: Edge cases and boundary conditions"
  );

  // Return unique tests (max 8)
  return [...new Set(tests)].slice(0, 8);
}

/**
 * 8. Draft Customer Response
 * Creates customer-safe communication
 */
export function draftCustomerResponse(
  ticket: SampleTicket,
  severity: SeverityLevel,
  nextSteps: string[]
): string {
  const productAreas = detectProductAreas(ticket);
  const primaryArea = productAreas[0];

  // Determine ETA based on severity
  let eta = "24-48 hours";
  if (severity === "Critical") eta = "2-4 hours";
  else if (severity === "High") eta = "4-8 hours";
  else if (severity === "Medium") eta = "1-2 business days";

  // Build response
  let response = `Dear ${ticket.customerName},\n\n`;

  response += `Thank you for reporting this issue. We understand the impact this is having on your operations and have escalated this to our engineering team as a **${severity.toLowerCase()} priority**.\n\n`;

  // Add empathy based on severity
  if (severity === "Critical") {
    response += `We recognize this is a critical issue preventing you from using our service. Our team is actively investigating and working on a resolution.\n\n`;
  } else if (severity === "High") {
    response += `We understand this issue is significantly impacting your workflow. Our team is prioritizing this investigation.\n\n`;
  }

  // Add investigation status
  response += `**Current Status:**\n`;
  response += `Our engineering team is investigating the ${primaryArea.toLowerCase()} system. `;

  // Add specific investigation details
  const firstStep = nextSteps[0];
  if (firstStep) {
    response += `We are currently ${firstStep.toLowerCase()}.\n\n`;
  }

  // Add timeline
  response += `**Expected Timeline:**\n`;
  response += `- Initial findings: ${severity === "Critical" ? "Within 1 hour" : "Within 4 hours"}\n`;
  response += `- Resolution target: ${eta}\n`;
  response += `- Updates: Every ${severity === "Critical" ? "2" : "4"} hours until resolved\n\n`;

  // Add workaround if applicable
  if (severity === "Medium" || severity === "Low") {
    response += `We will investigate if there are any temporary workarounds available and will share them with you as soon as possible.\n\n`;
  }

  // Closing
  response += `We apologize for the inconvenience and appreciate your patience. If you have any additional information that might help our investigation, please don't hesitate to share it.\n\n`;

  response += `Best regards,\n`;
  response += `Customer Support Team\n`;
  response += `Ticket Reference: ${ticket.id}`;

  return response;
}

/**
 * 9. Calculate Confidence Score
 * Assesses analysis confidence based on ticket quality
 */
export function calculateConfidence(ticket: SampleTicket): number {
  const text = `${ticket.title} ${ticket.description}`;
  let confidence = CONFIDENCE_FACTORS.baseConfidence;

  // Check for detailed description
  if (ticket.description.length > 200) {
    confidence += CONFIDENCE_FACTORS.hasDetailedDescription;
  }

  // Check for error messages
  if (/error|exception|stack trace|failed|code \d+/i.test(text)) {
    confidence += CONFIDENCE_FACTORS.hasErrorMessages;
  }

  // Check for reproduction steps
  if (/step|reproduce|when I|after I|tried/i.test(text)) {
    confidence += CONFIDENCE_FACTORS.hasReproductionSteps;
  }

  // Check for environment info
  if (/browser|chrome|firefox|safari|mobile|desktop|version|os/i.test(text)) {
    confidence += CONFIDENCE_FACTORS.hasEnvironmentInfo;
  }

  // Check for timing information
  if (/yesterday|today|started|since|after|before|time|hour|minute/i.test(text)) {
    confidence += CONFIDENCE_FACTORS.hasTimingInfo;
  }

  // Check for impact metrics
  if (/users|customers|percent|%|\d+|revenue|sales|transactions/i.test(text)) {
    confidence += CONFIDENCE_FACTORS.hasImpactMetrics;
  }

  // Check if matches known patterns
  const hasKnownPatterns = Object.values(PRODUCT_AREA_KEYWORDS).some((keywords) =>
    keywords.some((keyword) => new RegExp(keyword, "i").test(text))
  );
  if (hasKnownPatterns) {
    confidence += CONFIDENCE_FACTORS.matchesKnownPatterns;
  }

  // Cap at 100
  return Math.min(confidence, 100);
}

/**
 * 10. Estimate Time Saved
 * Returns fixed time savings estimate
 */
export function estimateTimeSaved(): number {
  return TIME_SAVED_MINUTES;
}

/**
 * Main Orchestrator Function
 * Analyzes ticket and returns complete analysis
 */
export function analyzeTicket(ticket: SampleTicket): TicketAnalysis {
  // Step 1: Analyze severity
  const severity = analyzeSeverity(ticket);

  // Step 2: Detect product areas
  const productAreas = detectProductAreas(ticket);

  // Step 3: Generate root causes
  const rootCauses = generateRootCauses(ticket, productAreas);

  // Step 4: Calculate business impact
  const businessImpact = calculateBusinessImpact(ticket, severity);

  // Step 5: Create handoff summary
  const engineeringHandoffSummary = createHandoffSummary(
    ticket,
    severity,
    rootCauses
  );

  // Step 6: Suggest next steps
  const nextSteps = suggestNextSteps(ticket, severity, productAreas);

  // Step 7: Generate regression tests
  const regressionTests = generateRegressionTests(ticket, productAreas);

  // Step 8: Draft customer response
  const customerResponse = draftCustomerResponse(ticket, severity, nextSteps);

  // Step 9: Calculate confidence
  const confidenceScore = calculateConfidence(ticket);

  // Step 10: Estimate time saved
  const timeSaved = estimateTimeSaved();

  // Return complete analysis
  return {
    severity,
    businessImpact,
    likelyProductArea: productAreas.join(", "),
    possibleRootCauses: rootCauses,
    engineeringHandoffSummary,
    recommendedNextSteps: nextSteps,
    regressionTestSuggestions: regressionTests,
    customerResponseDraft: customerResponse,
    confidenceScore: confidenceScore / 100, // Convert to 0-1 range
    estimatedTriageTimeSaved: `${timeSaved} minutes`,
  };
}

// Made with Bob
