import { NextRequest, NextResponse } from "next/server";
import { analyzeTicket } from "@/lib/watsonxAnalyzer";
import { SampleTicket, TicketAnalysis } from "@/types/ticket";

/**
 * API Route: POST /api/analyze
 * Analyzes a support ticket and returns AI-generated insights
 */

interface AnalyzeTicketRequest {
  title: string;
  description: string;
}

interface AnalyzeTicketResponse {
  success: boolean;
  analysis?: TicketAnalysis;
  error?: string;
  processingTime?: number;
}

/**
 * Simulate AI processing delay (2-3 seconds)
 * Note: This delay is only used for mock analyzer. When using watsonx,
 * the actual API call time is measured instead.
 */
async function simulateProcessing(): Promise<number> {
  const delay = Math.floor(Math.random() * 1000) + 2000; // 2000-3000ms
  await new Promise((resolve) => setTimeout(resolve, delay));
  return delay;
}

/**
 * Validate request body
 */
function validateRequest(body: unknown): {
  valid: boolean;
  error?: string;
  data?: AnalyzeTicketRequest;
} {
  // Check if body exists
  if (!body || typeof body !== "object") {
    return {
      valid: false,
      error: "Request body is required",
    };
  }

  const { title, description } = body as Partial<AnalyzeTicketRequest>;

  // Validate title
  if (!title || typeof title !== "string") {
    return {
      valid: false,
      error: "Title is required and must be a string",
    };
  }

  if (title.trim().length === 0) {
    return {
      valid: false,
      error: "Title cannot be empty",
    };
  }

  // Validate description
  if (!description || typeof description !== "string") {
    return {
      valid: false,
      error: "Description is required and must be a string",
    };
  }

  if (description.trim().length < 50) {
    return {
      valid: false,
      error: "Description must be at least 50 characters long",
    };
  }

  return {
    valid: true,
    data: { title: title.trim(), description: description.trim() },
  };
}

/**
 * POST handler for ticket analysis
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON in request body",
        } as AnalyzeTicketResponse,
        { status: 400 }
      );
    }

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
        } as AnalyzeTicketResponse,
        { status: 400 }
      );
    }

    const { title, description } = validation.data!;

    // Create sample ticket object for analysis
    const ticket: SampleTicket = {
      id: `TICKET-${Date.now()}`,
      title,
      description,
      customerName: "API User",
      submittedDate: new Date().toISOString(),
    };

    // Measure processing time for watsonx API call
    // Note: The analyzer automatically falls back to mock data if watsonx
    // credentials (WATSONX_API_KEY and WATSONX_PROJECT_ID) are not configured
    const startTime = Date.now();
    const analysis = await analyzeTicket(ticket);
    const processingTime = Date.now() - startTime;

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        analysis,
        processingTime,
      } as AnalyzeTicketResponse,
      { status: 200 }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("Error analyzing ticket:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while analyzing the ticket",
      } as AnalyzeTicketResponse,
      { status: 500 }
    );
  }
}

// Made with Bob
