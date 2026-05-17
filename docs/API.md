# API Documentation

Complete API reference for Ticket Inteli.

## Table of Contents

- [Overview](#overview)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [POST /api/analyze](#post-apianalyze)
- [Data Types](#data-types)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Examples](#examples)

## Overview

The Ticket Inteli API provides a single endpoint for analyzing support tickets. It accepts ticket information and returns comprehensive analysis including severity, business impact, root causes, and recommended actions.

**Current Version:** v1 (Mock Implementation)  
**Future Version:** v2 (watsonx.ai Integration)

## Base URL

```
Development: http://localhost:3000
Production: https://your-domain.vercel.app
```

## Authentication

**Current:** No authentication required (MVP)  
**Future:** API key authentication via `Authorization` header

```http
Authorization: Bearer YOUR_API_KEY
```

## Endpoints

### POST /api/analyze

Analyzes a support ticket and returns comprehensive insights.

#### Request

**URL:** `/api/analyze`  
**Method:** `POST`  
**Content-Type:** `application/json`

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Brief ticket title (max 200 chars) |
| `description` | string | Yes | Detailed issue description (max 5000 chars) |
| `customerEmail` | string | No | Customer contact email |
| `priority` | string | No | Initial priority: `low`, `medium`, `high`, `critical` |

**Example Request:**

```json
{
  "title": "Login page returns 500 error",
  "description": "Users are unable to log in to the application. When they enter their credentials and click the login button, the page displays a 500 Internal Server Error. This started happening approximately 2 hours ago. Multiple users have reported the same issue via email and phone calls.",
  "customerEmail": "support@example.com",
  "priority": "high"
}
```

#### Response

**Status Code:** `200 OK`  
**Content-Type:** `application/json`

**Response Body:**

```json
{
  "severity": "high",
  "businessImpact": {
    "affectedUsers": 150,
    "revenueImpact": "$15,000/hour",
    "description": "Critical authentication failure affecting all users attempting to access the platform. Revenue impact estimated at $15,000 per hour based on average transaction value and user activity."
  },
  "productAreas": ["Authentication", "API"],
  "rootCauses": [
    {
      "cause": "Token validation service failure",
      "confidence": 85,
      "evidence": "500 error indicates server-side issue; authentication context suggests token service"
    },
    {
      "cause": "Database connection timeout",
      "confidence": 60,
      "evidence": "Login operations require database access; timeouts can cause 500 errors"
    }
  ],
  "engineeringHandoff": {
    "summary": "Critical authentication service failure preventing all user logins",
    "technicalDetails": "500 Internal Server Error on login endpoint. Likely token validation service or database connectivity issue.",
    "affectedComponents": ["Auth Service", "Token Validator", "User Database"],
    "priority": "P0 - Critical",
    "assignedTeam": "Platform Engineering"
  },
  "resolutionSteps": [
    {
      "step": "Check token validation service health",
      "priority": "immediate",
      "estimatedTime": "5 minutes"
    },
    {
      "step": "Review authentication service logs",
      "priority": "immediate",
      "estimatedTime": "10 minutes"
    },
    {
      "step": "Verify database connectivity",
      "priority": "high",
      "estimatedTime": "5 minutes"
    }
  ],
  "regressionTests": [
    "Test login with valid credentials",
    "Test login with invalid credentials",
    "Test token validation service under load",
    "Verify database connection pooling"
  ],
  "customerCommunication": "We're aware of a login issue affecting our platform and are actively working to resolve it. Our engineering team has identified the root cause and expects to have service restored within the next 30 minutes. We apologize for the inconvenience and will provide updates every 15 minutes.",
  "timeEstimate": "2-4 hours",
  "similarTickets": [
    {
      "id": "TICK-1234",
      "title": "Authentication service timeout",
      "similarity": 85,
      "resolution": "Restarted token validation service"
    },
    {
      "id": "TICK-5678",
      "title": "Login failures during peak hours",
      "similarity": 70,
      "resolution": "Increased database connection pool"
    }
  ],
  "escalation": {
    "shouldEscalate": true,
    "reason": "Critical severity with high business impact",
    "escalateTo": "Engineering Manager",
    "urgency": "immediate"
  },
  "confidence": 87,
  "timeSaved": 28
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `severity` | string | Ticket severity: `critical`, `high`, `medium`, `low` |
| `businessImpact` | object | Business impact assessment |
| `businessImpact.affectedUsers` | number | Estimated number of affected users |
| `businessImpact.revenueImpact` | string | Estimated revenue impact |
| `businessImpact.description` | string | Detailed impact description |
| `productAreas` | string[] | Affected product areas |
| `rootCauses` | object[] | Potential root causes with confidence |
| `rootCauses[].cause` | string | Root cause description |
| `rootCauses[].confidence` | number | Confidence level (0-100) |
| `rootCauses[].evidence` | string | Supporting evidence |
| `engineeringHandoff` | object | Technical handoff information |
| `engineeringHandoff.summary` | string | Brief technical summary |
| `engineeringHandoff.technicalDetails` | string | Detailed technical information |
| `engineeringHandoff.affectedComponents` | string[] | Affected system components |
| `engineeringHandoff.priority` | string | Engineering priority level |
| `engineeringHandoff.assignedTeam` | string | Recommended team assignment |
| `resolutionSteps` | object[] | Recommended resolution steps |
| `resolutionSteps[].step` | string | Action description |
| `resolutionSteps[].priority` | string | Step priority |
| `resolutionSteps[].estimatedTime` | string | Time estimate |
| `regressionTests` | string[] | Recommended test scenarios |
| `customerCommunication` | string | Draft customer response |
| `timeEstimate` | string | Expected resolution time |
| `similarTickets` | object[] | Related historical tickets |
| `similarTickets[].id` | string | Ticket ID |
| `similarTickets[].title` | string | Ticket title |
| `similarTickets[].similarity` | number | Similarity score (0-100) |
| `similarTickets[].resolution` | string | How it was resolved |
| `escalation` | object | Escalation recommendation |
| `escalation.shouldEscalate` | boolean | Whether to escalate |
| `escalation.reason` | string | Escalation reason |
| `escalation.escalateTo` | string | Escalation target |
| `escalation.urgency` | string | Urgency level |
| `confidence` | number | Overall analysis confidence (0-100) |
| `timeSaved` | number | Estimated time saved in minutes |

## Data Types

### Severity Levels

```typescript
type Severity = 'critical' | 'high' | 'medium' | 'low';
```

**Definitions:**
- `critical`: System down, all users affected, immediate action required
- `high`: Major functionality broken, many users affected, urgent action needed
- `medium`: Partial functionality impaired, some users affected, timely action needed
- `low`: Minor issue, few users affected, can be scheduled

### Product Areas

```typescript
type ProductArea = 
  | 'Authentication'
  | 'Billing'
  | 'API'
  | 'UI'
  | 'Database'
  | 'Performance'
  | 'Security'
  | 'Integration'
  | 'Mobile'
  | 'Email'
  | 'Reporting'
  | 'Other';
```

### Priority Levels

```typescript
type Priority = 
  | 'immediate'  // Action required now
  | 'high'       // Action required within hours
  | 'medium'     // Action required within days
  | 'low';       // Action can be scheduled
```

## Error Handling

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details (optional)"
  }
}
```

### Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `INVALID_REQUEST` | 400 | Missing or invalid request parameters |
| `TITLE_REQUIRED` | 400 | Ticket title is required |
| `DESCRIPTION_REQUIRED` | 400 | Ticket description is required |
| `TITLE_TOO_LONG` | 400 | Title exceeds 200 characters |
| `DESCRIPTION_TOO_LONG` | 400 | Description exceeds 5000 characters |
| `INVALID_EMAIL` | 400 | Invalid email format |
| `INVALID_PRIORITY` | 400 | Invalid priority value |
| `ANALYSIS_FAILED` | 500 | Analysis processing failed |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Example Error Response

```json
{
  "error": {
    "code": "TITLE_REQUIRED",
    "message": "Ticket title is required",
    "details": "The 'title' field must be provided and cannot be empty"
  }
}
```

## Rate Limits

**Current:** No rate limits (MVP)  
**Future:** 

- **Free Tier:** 100 requests/hour
- **Pro Tier:** 1,000 requests/hour
- **Enterprise:** Custom limits

**Rate Limit Headers:**
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1621234567
```

## Examples

### Example 1: Critical Authentication Issue

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Login page returns 500 error",
    "description": "Users cannot log in. The login page shows a 500 Internal Server Error. This started 2 hours ago.",
    "priority": "high"
  }'
```

**Response:**
```json
{
  "severity": "high",
  "businessImpact": {
    "affectedUsers": 150,
    "revenueImpact": "$15,000/hour",
    "description": "Critical authentication failure..."
  },
  "confidence": 87,
  "timeSaved": 28
}
```

### Example 2: Payment Processing Failure

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Payment processing fails with timeout",
    "description": "Customers report that payment submissions are timing out after 30 seconds. The payment page shows a generic error message.",
    "customerEmail": "billing@example.com",
    "priority": "critical"
  }'
```

**Response:**
```json
{
  "severity": "critical",
  "businessImpact": {
    "affectedUsers": 500,
    "revenueImpact": "$50,000/hour",
    "description": "Payment processing failure..."
  },
  "productAreas": ["Billing", "API", "Database"],
  "confidence": 92,
  "timeSaved": 28
}
```

### Example 3: UI Cosmetic Issue

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Button alignment issue on mobile",
    "description": "The submit button on the contact form is slightly misaligned on mobile devices. It does not affect functionality.",
    "priority": "low"
  }'
```

**Response:**
```json
{
  "severity": "low",
  "businessImpact": {
    "affectedUsers": 50,
    "revenueImpact": "Minimal",
    "description": "Minor UI cosmetic issue..."
  },
  "productAreas": ["UI", "Mobile"],
  "confidence": 78,
  "timeSaved": 25
}
```

### Example 4: Error Response

**Request:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Missing title field"
  }'
```

**Response:**
```json
{
  "error": {
    "code": "TITLE_REQUIRED",
    "message": "Ticket title is required",
    "details": "The 'title' field must be provided and cannot be empty"
  }
}
```

## Integration Examples

### JavaScript/TypeScript

```typescript
async function analyzeTicket(ticket: {
  title: string;
  description: string;
  customerEmail?: string;
  priority?: string;
}) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }

  return await response.json();
}

// Usage
try {
  const analysis = await analyzeTicket({
    title: 'Login page returns 500 error',
    description: 'Users cannot log in...',
    priority: 'high',
  });
  console.log('Severity:', analysis.severity);
  console.log('Confidence:', analysis.confidence);
} catch (error) {
  console.error('Analysis failed:', error.message);
}
```

### Python

```python
import requests
import json

def analyze_ticket(ticket):
    url = 'http://localhost:3000/api/analyze'
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post(url, headers=headers, json=ticket)
    
    if response.status_code == 200:
        return response.json()
    else:
        error = response.json()
        raise Exception(error['error']['message'])

# Usage
try:
    analysis = analyze_ticket({
        'title': 'Login page returns 500 error',
        'description': 'Users cannot log in...',
        'priority': 'high'
    })
    print(f"Severity: {analysis['severity']}")
    print(f"Confidence: {analysis['confidence']}")
except Exception as e:
    print(f"Analysis failed: {e}")
```

### cURL

```bash
# Basic analysis
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Login page returns 500 error",
    "description": "Users cannot log in. The login page shows a 500 Internal Server Error.",
    "priority": "high"
  }'

# With pretty printing
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Login page returns 500 error",
    "description": "Users cannot log in.",
    "priority": "high"
  }' | jq '.'
```

## Best Practices

### Request Optimization

1. **Provide detailed descriptions** - More context leads to better analysis
2. **Include relevant keywords** - Mention error codes, affected features, user counts
3. **Set appropriate priority** - Helps with initial severity assessment
4. **Include customer email** - Enables better tracking and follow-up

### Error Handling

1. **Always check response status** - Handle both success and error cases
2. **Implement retry logic** - For transient failures (503 errors)
3. **Log errors** - For debugging and monitoring
4. **Provide user feedback** - Show meaningful error messages

### Performance

1. **Cache results** - For identical tickets (optional)
2. **Implement timeouts** - Prevent hanging requests
3. **Use async/await** - For non-blocking operations
4. **Batch requests** - When analyzing multiple tickets (future feature)

## Future Enhancements

### Planned Features (v2)

- **Batch Analysis** - Analyze multiple tickets in one request
- **Webhook Support** - Real-time notifications for analysis completion
- **Custom Models** - Train on your organization's ticket history
- **Multi-language** - Support for non-English tickets
- **Streaming Responses** - Real-time analysis updates
- **Analytics API** - Query historical analysis data

### watsonx.ai Integration

The future version will integrate with IBM watsonx.ai:

```typescript
// Future implementation
const response = await watsonx.generateText({
  model: 'ibm/granite-3.1-8b-instruct',
  prompt: buildAnalysisPrompt(ticket),
  parameters: {
    temperature: 0.3,
    max_tokens: 2000,
  }
});
```

## Support

- **Documentation**: [docs/](../docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ticket-inteli/issues)
- **Email**: support@ticket-inteli.com (future)

---

**API Version:** v1  
**Last Updated:** May 17, 2026  
**Status:** MVP Complete