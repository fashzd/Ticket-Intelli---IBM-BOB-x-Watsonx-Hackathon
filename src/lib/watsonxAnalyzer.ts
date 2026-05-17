/**
 * WatsonX.ai Ticket Analyzer
 * Integrates IBM watsonx.ai for intelligent ticket analysis
 * Uses Granite 3.0 8B Instruct model for comprehensive ticket triage
 */

import { WatsonXAI } from "@ibm-cloud/watsonx-ai";
import { SampleTicket, TicketAnalysis } from "@/types/ticket";
import { analyzeTicket as mockAnalyzeTicket } from "./mockAnalyzer";

/**
 * Initialize WatsonX client with environment variables
 */
function initializeWatsonX(): WatsonXAI | null {
  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  const url = process.env.WATSONX_URL || "https://us-south.ml.cloud.ibm.com";

  if (!apiKey || !projectId) {
    console.warn(
      "WatsonX credentials not configured. Set WATSONX_API_KEY and WATSONX_PROJECT_ID environment variables."
    );
    return null;
  }

  try {
    const watsonxAIService = WatsonXAI.newInstance({
      version: "2024-05-31",
      serviceUrl: url,
    });

    return watsonxAIService;
  } catch (error) {
    console.error("Failed to initialize WatsonX client:", error);
    return null;
  }
}

/**
 * Build comprehensive analysis prompt for watsonx.ai
 */
function buildAnalysisPrompt(ticket: SampleTicket): string {
  return `You are an expert technical support analyst. Analyze the following customer support ticket and provide a comprehensive triage analysis.

**TICKET INFORMATION:**
- Ticket ID: ${ticket.id}
- Title: ${ticket.title}
- Customer: ${ticket.customerName}
- Submitted: ${ticket.submittedDate}
- Description: ${ticket.description}

**ANALYSIS REQUIREMENTS:**
Provide a detailed JSON response with the following fields:

1. **severity**: Classify as "Low", "Medium", "High", or "Critical" based on:
   - Impact on customer operations
   - Number of affected users
   - Revenue implications
   - Service availability

2. **businessImpact**: Detailed description of business impact including:
   - Estimated number of affected users
   - Revenue impact if applicable
   - Operational consequences
   - Customer trust implications

3. **likelyProductArea**: Comma-separated list of affected product areas (e.g., "Authentication, API, Database")

4. **possibleRootCauses**: Array of 3-5 likely root causes with technical details

5. **engineeringHandoffSummary**: Markdown-formatted summary for engineering team including:
   - Problem statement
   - Likely root causes
   - Urgency context
   - Investigation starting points

6. **recommendedNextSteps**: Array of 5-8 prioritized action items for resolution

7. **regressionTestSuggestions**: Array of 5-8 specific test cases to prevent recurrence

8. **customerResponseDraft**: Professional email response to customer including:
   - Acknowledgment and empathy
   - Current status
   - Expected timeline
   - Next steps

9. **confidenceScore**: Float between 0.0 and 1.0 indicating analysis confidence

10. **estimatedTriageTimeSaved**: String estimate (e.g., "28 minutes")

**OUTPUT FORMAT:**
Return ONLY a valid JSON object with these exact field names. Do not include any markdown formatting, code blocks, or additional text.

Example structure:
{
  "severity": "High",
  "businessImpact": "Approximately 500 users affected...",
  "likelyProductArea": "Authentication, API",
  "possibleRootCauses": ["Token validation failure", "Session timeout issue"],
  "engineeringHandoffSummary": "**High Priority Issue**\\n\\nProblem: Users unable to login...",
  "recommendedNextSteps": ["Check authentication service logs", "Verify token generation"],
  "regressionTestSuggestions": ["End-to-end test: Complete login flow", "Integration test: Token validation"],
  "customerResponseDraft": "Dear Customer,\\n\\nThank you for reporting...",
  "confidenceScore": 0.85,
  "estimatedTriageTimeSaved": "25 minutes"
}`;
}

/**
 * Parse and validate watsonx response
 */
function parseWatsonXResponse(responseText: string): TicketAnalysis | null {
  try {
    // Remove any markdown code blocks if present
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(cleanedText);

    // Validate required fields
    const requiredFields = [
      "severity",
      "businessImpact",
      "likelyProductArea",
      "possibleRootCauses",
      "engineeringHandoffSummary",
      "recommendedNextSteps",
      "regressionTestSuggestions",
      "customerResponseDraft",
      "confidenceScore",
      "estimatedTriageTimeSaved",
    ];

    for (const field of requiredFields) {
      if (!(field in parsed)) {
        console.error(`Missing required field: ${field}`);
        return null;
      }
    }

    // Validate severity value
    const validSeverities = ["Low", "Medium", "High", "Critical"];
    if (!validSeverities.includes(parsed.severity)) {
      console.error(`Invalid severity value: ${parsed.severity}`);
      return null;
    }

    // Validate arrays
    if (!Array.isArray(parsed.possibleRootCauses)) {
      console.error("possibleRootCauses must be an array");
      return null;
    }
    if (!Array.isArray(parsed.recommendedNextSteps)) {
      console.error("recommendedNextSteps must be an array");
      return null;
    }
    if (!Array.isArray(parsed.regressionTestSuggestions)) {
      console.error("regressionTestSuggestions must be an array");
      return null;
    }

    // Validate confidence score
    if (
      typeof parsed.confidenceScore !== "number" ||
      parsed.confidenceScore < 0 ||
      parsed.confidenceScore > 1
    ) {
      console.error("confidenceScore must be a number between 0 and 1");
      return null;
    }

    return parsed as TicketAnalysis;
  } catch (error) {
    console.error("Failed to parse WatsonX response:", error);
    console.error("Response text:", responseText);
    return null;
  }
}

/**
 * Main analysis function using watsonx.ai
 * Falls back to mock analyzer if watsonx is unavailable
 */
export async function analyzeTicket(
  ticket: SampleTicket
): Promise<TicketAnalysis> {
  const watsonxClient = initializeWatsonX();

  // Fallback to mock analyzer if watsonx not configured
  if (!watsonxClient) {
    console.log("Using mock analyzer (WatsonX not configured)");
    return mockAnalyzeTicket(ticket);
  }

  try {
    const modelId =
      process.env.WATSONX_MODEL_ID || "ibm/granite-3-8b-instruct";
    const projectId = process.env.WATSONX_PROJECT_ID!;

    // Build the analysis prompt
    const prompt = buildAnalysisPrompt(ticket);

    console.log("Calling WatsonX.ai for ticket analysis...");

    // Call watsonx.ai API
    const response = await watsonxClient.generateText({
      input: prompt,
      modelId: modelId,
      projectId: projectId,
      parameters: {
        temperature: 0.3,
        max_new_tokens: 2000,
        top_p: 0.9,
        repetition_penalty: 1.1,
      },
    });

    // Extract generated text
    const generatedText =
      response.result?.results?.[0]?.generated_text || "";

    if (!generatedText) {
      console.error("No generated text in WatsonX response");
      throw new Error("Empty response from WatsonX");
    }

    console.log("WatsonX response received, parsing...");

    // Parse and validate response
    const analysis = parseWatsonXResponse(generatedText);

    if (!analysis) {
      console.error("Failed to parse WatsonX response, using mock analyzer");
      return mockAnalyzeTicket(ticket);
    }

    console.log("WatsonX analysis completed successfully");
    return analysis;
  } catch (error) {
    console.error("Error calling WatsonX API:", error);
    console.log("Falling back to mock analyzer");
    return mockAnalyzeTicket(ticket);
  }
}

/**
 * Health check function to verify watsonx configuration
 */
export function isWatsonXConfigured(): boolean {
  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  return !!(apiKey && projectId);
}

/**
 * Get watsonx configuration status for debugging
 */
export function getWatsonXStatus(): {
  configured: boolean;
  apiKeySet: boolean;
  projectIdSet: boolean;
  urlSet: boolean;
  modelId: string;
} {
  return {
    configured: isWatsonXConfigured(),
    apiKeySet: !!process.env.WATSONX_API_KEY,
    projectIdSet: !!process.env.WATSONX_PROJECT_ID,
    urlSet: !!process.env.WATSONX_URL,
    modelId: process.env.WATSONX_MODEL_ID || "ibm/granite-3-8b-instruct",
  };
}

// Made with Bob