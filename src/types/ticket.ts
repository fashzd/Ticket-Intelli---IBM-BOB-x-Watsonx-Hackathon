/**
 * Ticket Analysis Types
 * Aligned with watsonx prompt schema
 */

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";

export interface TicketAnalysis {
  severity: SeverityLevel;
  businessImpact: string;
  likelyProductArea: string;
  possibleRootCauses: string[];
  engineeringHandoffSummary: string;
  recommendedNextSteps: string[];
  regressionTestSuggestions: string[];
  customerResponseDraft: string;
  confidenceScore: number;
  estimatedTriageTimeSaved: string;
}

export interface SampleTicket {
  id: string;
  title: string;
  description: string;
  customerName: string;
  submittedDate: string;
}

export interface AnalysisRequest {
  ticketText: string;
  ticketId?: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis?: TicketAnalysis;
  error?: string;
  timestamp: string;
}

// Made with Bob
