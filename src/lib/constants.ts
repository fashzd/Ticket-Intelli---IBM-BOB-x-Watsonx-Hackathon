/**
 * Constants for Mock Analyzer
 * Keyword mappings and patterns for heuristic-based ticket analysis
 */

import { SeverityLevel } from "@/types/ticket";

/**
 * Severity level keyword patterns
 */
export const SEVERITY_KEYWORDS: Record<SeverityLevel, string[]> = {
  Critical: [
    "down",
    "outage",
    "critical",
    "emergency",
    "production down",
    "complete failure",
    "system crash",
    "data loss",
    "security breach",
    "cannot access",
    "total failure",
    "all users affected",
    "revenue loss",
    "payment.*fail",
    "transaction.*fail",
    "service unavailable",
  ],
  High: [
    "urgent",
    "blocking",
    "broken",
    "not working",
    "fails",
    "error",
    "unable to",
    "cannot",
    "stopped working",
    "major issue",
    "significant impact",
    "multiple users",
    "login.*fail",
    "authentication.*fail",
    "performance.*severe",
  ],
  Medium: [
    "issue",
    "problem",
    "incorrect",
    "wrong",
    "slow",
    "delayed",
    "inconsistent",
    "missing",
    "unexpected",
    "intermittent",
    "sometimes",
    "occasionally",
    "minor bug",
  ],
  Low: [
    "question",
    "clarification",
    "enhancement",
    "feature request",
    "cosmetic",
    "typo",
    "suggestion",
    "improvement",
    "nice to have",
    "minor",
  ],
};

/**
 * Product area keyword patterns
 */
export const PRODUCT_AREA_KEYWORDS: Record<string, string[]> = {
  Authentication: [
    "login",
    "logout",
    "sign in",
    "sign up",
    "password",
    "authentication",
    "authorization",
    "access",
    "session",
    "token",
    "oauth",
    "sso",
    "2fa",
    "mfa",
    "credentials",
  ],
  Billing: [
    "payment",
    "billing",
    "invoice",
    "subscription",
    "charge",
    "refund",
    "credit card",
    "transaction",
    "checkout",
    "pricing",
    "plan",
    "upgrade",
    "downgrade",
  ],
  API: [
    "api",
    "endpoint",
    "rest",
    "graphql",
    "webhook",
    "integration",
    "request",
    "response",
    "status code",
    "rate limit",
    "timeout",
    "latency",
  ],
  UI: [
    "button",
    "page",
    "screen",
    "display",
    "layout",
    "design",
    "interface",
    "navigation",
    "menu",
    "form",
    "modal",
    "popup",
    "responsive",
    "mobile",
    "desktop",
  ],
  Database: [
    "database",
    "query",
    "data",
    "record",
    "table",
    "sql",
    "nosql",
    "migration",
    "schema",
    "index",
    "connection",
    "deadlock",
  ],
  Performance: [
    "slow",
    "performance",
    "speed",
    "latency",
    "timeout",
    "loading",
    "lag",
    "delay",
    "optimization",
    "memory",
    "cpu",
    "cache",
  ],
  Analytics: [
    "analytics",
    "dashboard",
    "report",
    "metrics",
    "chart",
    "graph",
    "statistics",
    "data visualization",
    "export",
    "aggregation",
  ],
  Email: [
    "email",
    "notification",
    "alert",
    "message",
    "smtp",
    "delivery",
    "bounce",
    "spam",
  ],
  Search: [
    "search",
    "filter",
    "query",
    "results",
    "indexing",
    "elasticsearch",
    "solr",
  ],
  FileStorage: [
    "upload",
    "download",
    "file",
    "attachment",
    "storage",
    "s3",
    "blob",
    "document",
  ],
};

/**
 * Root cause patterns by product area
 */
export const ROOT_CAUSE_PATTERNS: Record<string, string[]> = {
  Authentication: [
    "Session management service experiencing high latency",
    "Token validation logic has a race condition",
    "Recent OAuth provider configuration change",
    "Cookie domain mismatch after deployment",
    "Password hashing algorithm timeout under load",
    "SSO integration certificate expired",
  ],
  Billing: [
    "Payment gateway API timeout during peak hours",
    "Database transaction deadlock in billing service",
    "Currency conversion service unavailable",
    "Webhook retry logic causing duplicate charges",
    "Subscription state machine has edge case bug",
    "Tax calculation service returning incorrect rates",
  ],
  API: [
    "Rate limiting configuration too aggressive",
    "API gateway routing rules misconfigured",
    "Downstream service dependency failure",
    "Request validation schema out of sync",
    "Connection pool exhaustion under load",
    "API versioning header not properly handled",
  ],
  UI: [
    "JavaScript bundle size causing slow page loads",
    "CSS specificity conflict after recent update",
    "Browser compatibility issue with new feature",
    "CDN cache serving stale assets",
    "Responsive breakpoint logic incorrect",
    "Third-party script blocking render",
  ],
  Database: [
    "Missing database index on frequently queried column",
    "Connection pool size insufficient for load",
    "Long-running query blocking other transactions",
    "Database migration not fully applied",
    "Replication lag causing stale reads",
    "Query optimizer choosing suboptimal execution plan",
  ],
  Performance: [
    "Memory leak in background worker process",
    "N+1 query pattern in data fetching logic",
    "Cache invalidation strategy too aggressive",
    "Synchronous operation blocking event loop",
    "Large payload causing network bottleneck",
    "Inefficient algorithm with O(n²) complexity",
  ],
  Analytics: [
    "Data aggregation query missing WHERE clause",
    "ETL pipeline failed to complete last run",
    "Time zone conversion logic incorrect",
    "Materialized view not refreshed on schedule",
    "Data warehouse sync delay",
    "Report cache serving outdated results",
  ],
  Email: [
    "SMTP server rate limiting outbound messages",
    "Email template rendering engine timeout",
    "Bounce handling webhook not processing correctly",
    "SPF/DKIM records misconfigured",
    "Queue processing worker crashed",
    "Email service provider API degradation",
  ],
  Search: [
    "Search index not updated after data changes",
    "Query parsing logic has syntax error",
    "Relevance scoring algorithm needs tuning",
    "Search cluster node failure",
    "Index sharding imbalance",
    "Synonym dictionary outdated",
  ],
  FileStorage: [
    "Storage quota exceeded for account",
    "File upload size limit too restrictive",
    "Virus scanning service timeout",
    "CDN not properly configured for large files",
    "Multipart upload logic has edge case bug",
    "File metadata indexing delayed",
  ],
};

/**
 * Test type categories
 */
export const TEST_CATEGORIES = {
  unit: "Unit Test",
  integration: "Integration Test",
  e2e: "End-to-End Test",
  performance: "Performance Test",
  security: "Security Test",
  accessibility: "Accessibility Test",
} as const;

/**
 * Business impact templates by severity
 */
export const BUSINESS_IMPACT_TEMPLATES: Record<SeverityLevel, {
  userRange: [number, number];
  revenueRange: [number, number];
  description: string;
}> = {
  Critical: {
    userRange: [1000, 10000],
    revenueRange: [10000, 100000],
    description: "Complete service disruption. Direct revenue loss and severe customer impact. Immediate action required.",
  },
  High: {
    userRange: [100, 1000],
    revenueRange: [1000, 10000],
    description: "Significant functionality impaired. Customer productivity affected. High priority resolution needed.",
  },
  Medium: {
    userRange: [10, 100],
    revenueRange: [100, 1000],
    description: "Moderate impact on user experience. Workarounds may be available. Should be addressed in current sprint.",
  },
  Low: {
    userRange: [1, 10],
    revenueRange: [0, 100],
    description: "Minor inconvenience. Limited user impact. Can be scheduled for future release.",
  },
};

/**
 * Next step templates by severity and product area
 */
export const NEXT_STEP_TEMPLATES = {
  immediate: [
    "Engage on-call engineer for immediate investigation",
    "Check system health dashboard and recent deployments",
    "Review error logs from past 24 hours",
    "Verify all dependent services are operational",
  ],
  investigation: [
    "Reproduce issue in staging environment",
    "Analyze relevant application logs and traces",
    "Review recent code changes in affected area",
    "Check monitoring metrics for anomalies",
  ],
  mitigation: [
    "Implement temporary workaround if available",
    "Scale up resources if load-related",
    "Roll back recent deployment if regression identified",
    "Enable feature flag to disable problematic feature",
  ],
  resolution: [
    "Develop and test permanent fix",
    "Update documentation and runbooks",
    "Add monitoring and alerting for early detection",
    "Conduct post-mortem to prevent recurrence",
  ],
  communication: [
    "Notify affected customers of issue and ETA",
    "Update status page with current information",
    "Prepare customer communication for resolution",
    "Document lessons learned for team",
  ],
};

/**
 * Confidence score factors
 */
export const CONFIDENCE_FACTORS = {
  hasDetailedDescription: 15,
  hasErrorMessages: 20,
  hasReproductionSteps: 15,
  hasEnvironmentInfo: 10,
  hasTimingInfo: 10,
  hasImpactMetrics: 15,
  matchesKnownPatterns: 15,
  baseConfidence: 40,
};

/**
 * Time saved estimate (in minutes)
 */
export const TIME_SAVED_MINUTES = 28; // 30 min manual triage - 2 min AI analysis

// Made with Bob
