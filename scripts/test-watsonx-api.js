/**
 * WatsonX API Test Script
 * Tests the Watson API credentials and functionality
 * Run with: node scripts/test-watsonx-api.js
 */

const { WatsonXAI } = require("@ibm-cloud/watsonx-ai");
const { IamAuthenticator } = require("ibm-cloud-sdk-core");
require("dotenv").config({ path: ".env" });

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log("\n" + "=".repeat(60));
  log(title, colors.bright + colors.cyan);
  console.log("=".repeat(60));
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

/**
 * Test 1: Check environment variables
 */
function testEnvironmentVariables() {
  logSection("TEST 1: Environment Variables");

  const apiKey = process.env.WATSONX_API_KEY;
  const projectId = process.env.WATSONX_PROJECT_ID;
  const url = process.env.WATSONX_URL;
  const modelId = process.env.WATSONX_MODEL_ID;

  let allPresent = true;

  if (apiKey) {
    logSuccess(`WATSONX_API_KEY is set (${apiKey.substring(0, 10)}...)`);
  } else {
    logError("WATSONX_API_KEY is not set");
    allPresent = false;
  }

  if (projectId) {
    logSuccess(`WATSONX_PROJECT_ID is set (${projectId})`);
  } else {
    logError("WATSONX_PROJECT_ID is not set");
    allPresent = false;
  }

  if (url) {
    logSuccess(`WATSONX_URL is set (${url})`);
  } else {
    logWarning("WATSONX_URL is not set (will use default: us-south)");
  }

  if (modelId) {
    logSuccess(`WATSONX_MODEL_ID is set (${modelId})`);
  } else {
    logWarning(
      "WATSONX_MODEL_ID is not set (will use default: ibm/granite-3-8b-instruct)"
    );
  }

  return allPresent;
}

/**
 * Test 2: Initialize WatsonX client
 */
async function testClientInitialization() {
  logSection("TEST 2: WatsonX Client Initialization");

  try {
    const apiKey = process.env.WATSONX_API_KEY;
    const url = process.env.WATSONX_URL || "https://us-south.ml.cloud.ibm.com";

    logInfo(`Initializing WatsonX client with URL: ${url}`);
    logInfo("Creating IAM authenticator...");

    // Create IAM authenticator with API key
    const authenticator = new IamAuthenticator({
      apikey: apiKey,
    });

    const watsonxAIService = WatsonXAI.newInstance({
      version: "2024-05-31",
      serviceUrl: url,
      authenticator: authenticator,
    });

    logSuccess("WatsonX client initialized successfully");
    return watsonxAIService;
  } catch (error) {
    logError(`Failed to initialize WatsonX client: ${error.message}`);
    console.error(error);
    return null;
  }
}

/**
 * Test 3: Simple text generation test
 */
async function testSimpleGeneration(client) {
  logSection("TEST 3: Simple Text Generation");

  if (!client) {
    logError("Cannot test - client not initialized");
    return false;
  }

  try {
    const projectId = process.env.WATSONX_PROJECT_ID;
    const modelId =
      process.env.WATSONX_MODEL_ID || "ibm/granite-3-8b-instruct";

    logInfo(`Using model: ${modelId}`);
    logInfo(`Using project: ${projectId}`);
    logInfo("Sending test prompt...");

    const startTime = Date.now();

    const response = await client.generateText({
      input: "What is 2+2? Answer with just the number.",
      modelId: modelId,
      projectId: projectId,
      parameters: {
        temperature: 0.1,
        max_new_tokens: 50,
      },
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    const generatedText =
      response.result?.results?.[0]?.generated_text || "";

    if (generatedText) {
      logSuccess(`Response received in ${duration}ms`);
      logInfo(`Generated text: "${generatedText.trim()}"`);
      return true;
    } else {
      logError("No generated text in response");
      return false;
    }
  } catch (error) {
    logError(`Text generation failed: ${error.message}`);
    if (error.response) {
      logError(`Status: ${error.response.status}`);
      logError(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    return false;
  }
}

/**
 * Test 4: Ticket analysis test
 */
async function testTicketAnalysis(client) {
  logSection("TEST 4: Ticket Analysis");

  if (!client) {
    logError("Cannot test - client not initialized");
    return false;
  }

  try {
    const projectId = process.env.WATSONX_PROJECT_ID;
    const modelId =
      process.env.WATSONX_MODEL_ID || "ibm/granite-3-8b-instruct";

    const testTicket = {
      id: "TEST-001",
      title: "Users unable to login to application",
      description:
        "Multiple users are reporting that they cannot log into the application. They enter their credentials but receive an 'Authentication failed' error. This started happening approximately 2 hours ago. Approximately 50 users are affected.",
      customerName: "Test Customer",
      submittedDate: new Date().toISOString(),
    };

    logInfo("Analyzing test ticket...");
    logInfo(`Title: ${testTicket.title}`);

    const prompt = `You are an expert technical support analyst. Analyze this ticket and provide a brief JSON response with: severity (Low/Medium/High/Critical), businessImpact (one sentence), and likelyProductArea (comma-separated).

Ticket: ${testTicket.title}
Description: ${testTicket.description}

Return only valid JSON, no markdown:`;

    const startTime = Date.now();

    const response = await client.generateText({
      input: prompt,
      modelId: modelId,
      projectId: projectId,
      parameters: {
        temperature: 0.3,
        max_new_tokens: 500,
      },
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    const generatedText =
      response.result?.results?.[0]?.generated_text || "";

    if (generatedText) {
      logSuccess(`Analysis completed in ${duration}ms`);
      logInfo("Generated analysis:");
      console.log(generatedText.trim());

      // Try to parse as JSON
      try {
        const parsed = JSON.parse(
          generatedText.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "")
        );
        logSuccess("Response is valid JSON");
        return true;
      } catch {
        logWarning("Response is not valid JSON (but generation worked)");
        return true;
      }
    } else {
      logError("No generated text in response");
      return false;
    }
  } catch (error) {
    logError(`Ticket analysis failed: ${error.message}`);
    if (error.response) {
      logError(`Status: ${error.response.status}`);
      logError(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    return false;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log("\n");
  log("╔════════════════════════════════════════════════════════════╗", colors.bright);
  log("║         WatsonX API Credential & Functionality Test        ║", colors.bright);
  log("╚════════════════════════════════════════════════════════════╝", colors.bright);

  const results = {
    envVars: false,
    clientInit: false,
    simpleGen: false,
    ticketAnalysis: false,
  };

  // Test 1: Environment variables
  results.envVars = testEnvironmentVariables();

  if (!results.envVars) {
    logSection("SUMMARY");
    logError(
      "Environment variables are not properly configured. Please check your .env file."
    );
    process.exit(1);
  }

  // Test 2: Client initialization
  const client = await testClientInitialization();
  results.clientInit = !!client;

  if (!client) {
    logSection("SUMMARY");
    logError("Failed to initialize WatsonX client. Check your credentials.");
    process.exit(1);
  }

  // Test 3: Simple generation
  results.simpleGen = await testSimpleGeneration(client);

  // Test 4: Ticket analysis
  results.ticketAnalysis = await testTicketAnalysis(client);

  // Summary
  logSection("TEST SUMMARY");

  const allPassed = Object.values(results).every((r) => r);

  if (allPassed) {
    logSuccess("All tests passed! ✓");
    logInfo("\nYour WatsonX API is properly configured and working.");
    logInfo("You can now use the ticket analysis application.");
  } else {
    logWarning("Some tests failed:");
    Object.entries(results).forEach(([test, passed]) => {
      if (passed) {
        logSuccess(`  ${test}: PASSED`);
      } else {
        logError(`  ${test}: FAILED`);
      }
    });
  }

  console.log("\n");
}

// Run tests
runTests().catch((error) => {
  logError(`Unexpected error: ${error.message}`);
  console.error(error);
  process.exit(1);
});

// Made with Bob
