# Ticket Inteli Tutorial

Complete step-by-step guide to using Ticket Inteli for support ticket analysis.

## Table of Contents

- [Getting Started](#getting-started)
- [Quick Start Guide](#quick-start-guide)
- [Analyzing Your First Ticket](#analyzing-your-first-ticket)
- [Understanding Results](#understanding-results)
- [Common Use Cases](#common-use-cases)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Tips & Best Practices](#tips--best-practices)

## Getting Started

### Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18+ installed
- ✅ Application running on `http://localhost:3000`
- ✅ Basic understanding of support tickets

### First Time Setup

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   ```
   http://localhost:3000
   ```

3. **Verify the application loads**
   - You should see the home page with "Ticket Inteli" header
   - Navigation menu should be visible
   - "Get Started" button should be clickable

## Quick Start Guide

### 5-Minute Demo

Follow these steps for a quick demonstration:

1. **Navigate to Analyze Page**
   - Click "Get Started" on home page
   - Or click "Analyze" in the navigation menu

2. **Select a Sample Ticket**
   - Click "Try Sample Ticket" button
   - Select "Login Page 500 Error" from dropdown
   - Form will auto-fill with ticket details

3. **Analyze the Ticket**
   - Click "Analyze Ticket" button
   - Wait 2-3 seconds for analysis
   - Results will appear below

4. **Explore Results**
   - Click on any section to expand
   - Use copy buttons to copy content
   - Review all 10 analysis outputs

**Congratulations!** You've completed your first ticket analysis.

## Analyzing Your First Ticket

### Method 1: Using Sample Tickets (Recommended for Learning)

Sample tickets are pre-loaded examples that demonstrate different severity levels and issue types.

#### Step 1: Access Sample Tickets

1. Navigate to the Analyze page
2. Look for the "Try Sample Ticket" button
3. Click to open the dropdown

#### Step 2: Choose a Sample

Available samples:

| Ticket | Severity | Best For |
|--------|----------|----------|
| Login Page 500 Error | High | Learning critical issue analysis |
| Payment Processing Failure | Critical | Understanding business impact |
| Slow Dashboard Loading | Medium | Performance issue analysis |
| UI Button Misalignment | Low | Minor bug handling |

#### Step 3: Review Auto-Filled Data

After selection, the form will populate with:
- **Title**: Brief issue description
- **Description**: Detailed problem explanation
- **Customer Email**: Contact information
- **Priority**: Initial severity assessment

#### Step 4: Analyze

Click the "Analyze Ticket" button and wait for results.

### Method 2: Manual Ticket Entry

For analyzing your own tickets:

#### Step 1: Fill Out the Form

**Title** (Required)
- Brief, descriptive summary
- Max 200 characters
- Example: "Users cannot complete checkout process"

**Description** (Required)
- Detailed issue explanation
- Include error messages, steps to reproduce, user impact
- Max 5000 characters
- Example:
  ```
  Multiple users report that when they click the "Complete Purchase" 
  button during checkout, the page freezes and shows a loading spinner 
  indefinitely. The issue started approximately 3 hours ago. 
  
  Error in browser console: "Payment gateway timeout after 30 seconds"
  
  Affected users: Approximately 50 customers
  Impact: Unable to complete purchases
  ```

**Customer Email** (Optional)
- Contact email for follow-up
- Example: "support@company.com"

**Priority** (Optional)
- Your initial assessment: Low, Medium, High, Critical
- AI will provide its own severity analysis

#### Step 2: Validate Input

The form will show validation errors if:
- Title is missing or too long
- Description is missing or too long
- Email format is invalid

#### Step 3: Submit for Analysis

Click "Analyze Ticket" to process.

## Understanding Results

### Analysis Overview

Every analysis provides 10 comprehensive outputs:

### 1. Severity Assessment

**What it shows:**
- Critical, High, Medium, or Low severity
- Color-coded badge (Red, Orange, Yellow, Blue)
- Confidence score (0-100%)

**How to interpret:**
- **Critical (Red)**: System down, immediate action required
- **High (Orange)**: Major functionality broken, urgent action needed
- **Medium (Yellow)**: Partial impairment, timely action needed
- **Low (Blue)**: Minor issue, can be scheduled

**Example:**
```
Severity: HIGH (87% confidence)
"Critical authentication failure affecting user access"
```

### 2. Business Impact

**What it shows:**
- Number of affected users
- Revenue impact estimate
- Detailed impact description

**How to use:**
- Prioritize tickets by business impact
- Communicate urgency to stakeholders
- Justify resource allocation

**Example:**
```
Affected Users: 150
Revenue Impact: $15,000/hour
Description: "Critical authentication failure affecting all users 
attempting to access the platform..."
```

### 3. Product Areas

**What it shows:**
- List of affected system components
- Examples: Authentication, Billing, API, UI, Database

**How to use:**
- Route to correct engineering team
- Identify system dependencies
- Plan testing scope

**Example:**
```
Product Areas: Authentication, API, Database
```

### 4. Root Cause Analysis

**What it shows:**
- Potential root causes ranked by confidence
- Supporting evidence for each cause
- Confidence percentage

**How to use:**
- Start investigation with highest confidence causes
- Review evidence to validate hypotheses
- Plan diagnostic steps

**Example:**
```
1. Token validation service failure (85% confidence)
   Evidence: "500 error indicates server-side issue"

2. Database connection timeout (60% confidence)
   Evidence: "Login operations require database access"
```

### 5. Engineering Handoff

**What it shows:**
- Technical summary for developers
- Affected components
- Priority level
- Recommended team assignment

**How to use:**
- Copy and paste into Jira/ticket system
- Share with engineering team
- Track progress

**Example:**
```
Summary: Critical authentication service failure
Technical Details: 500 Internal Server Error on login endpoint
Affected Components: Auth Service, Token Validator, User Database
Priority: P0 - Critical
Assigned Team: Platform Engineering
```

### 6. Resolution Steps

**What it shows:**
- Prioritized action items
- Time estimates for each step
- Regression test scenarios

**How to use:**
- Follow steps in order
- Track time spent
- Run regression tests after fix

**Example:**
```
Steps:
1. Check token validation service health (5 minutes)
2. Review authentication service logs (10 minutes)
3. Verify database connectivity (5 minutes)

Regression Tests:
- Test login with valid credentials
- Test token validation under load
```

### 7. Customer Communication

**What it shows:**
- Professional, customer-safe response draft
- Acknowledges issue
- Sets expectations
- Provides timeline

**How to use:**
- Copy and customize for your brand voice
- Send to affected customers
- Update as situation evolves

**Example:**
```
"We're aware of a login issue affecting our platform and are 
actively working to resolve it. Our engineering team has identified 
the root cause and expects to have service restored within the next 
30 minutes. We apologize for the inconvenience and will provide 
updates every 15 minutes."
```

### 8. Time Estimate

**What it shows:**
- Expected resolution time range
- Based on severity and complexity

**How to use:**
- Set customer expectations
- Plan resource allocation
- Track against actual resolution time

**Example:**
```
Time Estimate: 2-4 hours
```

### 9. Similar Tickets

**What it shows:**
- Historical tickets with similar issues
- Similarity score
- How they were resolved

**How to use:**
- Learn from past resolutions
- Identify recurring issues
- Apply proven solutions

**Example:**
```
TICK-1234: Authentication service timeout (85% similar)
Resolution: Restarted token validation service

TICK-5678: Login failures during peak hours (70% similar)
Resolution: Increased database connection pool
```

### 10. Escalation Recommendation

**What it shows:**
- Whether to escalate
- Escalation reason
- Who to escalate to
- Urgency level

**How to use:**
- Follow escalation protocol
- Notify appropriate stakeholders
- Document escalation decision

**Example:**
```
Should Escalate: YES
Reason: Critical severity with high business impact
Escalate To: Engineering Manager
Urgency: Immediate
```

## Common Use Cases

### Use Case 1: Critical Production Issue

**Scenario:** Login system is down, all users affected

**Steps:**
1. Create ticket with detailed error information
2. Analyze immediately
3. Review severity (should be Critical/High)
4. Copy Engineering Handoff to Slack/Jira
5. Follow Resolution Steps in order
6. Use Customer Communication template
7. Check Similar Tickets for quick fixes
8. Escalate per recommendation

**Expected Outcome:**
- Clear action plan in 2 minutes
- Engineering team has all needed information
- Customers receive professional communication
- Issue resolved faster with structured approach

### Use Case 2: Payment Processing Problem

**Scenario:** Customers report failed payment transactions

**Steps:**
1. Gather error messages and affected user count
2. Create detailed ticket description
3. Analyze ticket
4. Review Business Impact (revenue loss)
5. Check Root Causes (payment gateway, database)
6. Share Engineering Handoff with payments team
7. Monitor Similar Tickets for patterns
8. Update customers using communication template

**Expected Outcome:**
- Revenue impact quantified
- Payment team has technical details
- Customers kept informed
- Pattern analysis for prevention

### Use Case 3: Performance Degradation

**Scenario:** Dashboard loading slowly for some users

**Steps:**
1. Document symptoms and affected user percentage
2. Include performance metrics if available
3. Analyze ticket
4. Review severity (likely Medium)
5. Check Product Areas (Performance, Database, API)
6. Follow Resolution Steps for diagnostics
7. Plan regression tests
8. Schedule fix based on time estimate

**Expected Outcome:**
- Performance issue properly categorized
- Diagnostic steps prioritized
- Testing plan created
- Realistic timeline set

### Use Case 4: Minor UI Bug

**Scenario:** Button misaligned on mobile devices

**Steps:**
1. Create ticket with screenshot description
2. Analyze ticket
3. Confirm Low severity
4. Review Product Areas (UI, Mobile)
5. Add to backlog with time estimate
6. Use for sprint planning

**Expected Outcome:**
- Bug properly prioritized
- Not treated as urgent
- Scheduled appropriately
- Time estimate for planning

## Advanced Features

### Copying Content

**Individual Sections:**
1. Click the copy icon next to any section header
2. Content is copied to clipboard
3. Toast notification confirms success

**All Results:**
1. Scroll to top of results
2. Click "Copy All" button
3. Entire analysis copied in formatted text

**Use Cases:**
- Paste into Jira tickets
- Share in Slack channels
- Email to stakeholders
- Document in wiki

### Keyboard Navigation

**Shortcuts:**
- `Tab`: Navigate between elements
- `Enter/Space`: Activate buttons, expand sections
- `Escape`: Close dropdowns
- `Ctrl/Cmd + C`: Copy selected text

### Expanding/Collapsing Sections

- Click section header to expand/collapse
- All sections start collapsed for overview
- Expand relevant sections for details
- Collapse to reduce clutter

## Troubleshooting

### Common Issues

#### Issue: "Title is required" error

**Solution:**
- Ensure title field is not empty
- Title must be 1-200 characters
- Remove leading/trailing spaces

#### Issue: Analysis takes too long

**Possible Causes:**
- Network connectivity issues
- Server overload
- Large description text

**Solutions:**
1. Check internet connection
2. Refresh page and try again
3. Reduce description length
4. Contact support if persists

#### Issue: Results don't make sense

**Possible Causes:**
- Vague ticket description
- Missing context
- Unusual issue type

**Solutions:**
1. Add more details to description
2. Include error messages
3. Specify affected user count
4. Mention when issue started
5. Re-analyze with better information

#### Issue: Copy button doesn't work

**Solutions:**
1. Check browser clipboard permissions
2. Try manual copy (Ctrl/Cmd + C)
3. Use different browser
4. Check browser console for errors

#### Issue: Sample tickets don't load

**Solutions:**
1. Refresh the page
2. Clear browser cache
3. Check browser console
4. Verify application is running

### Getting Help

If you encounter issues:

1. **Check Documentation**
   - README.md
   - API.md
   - COMPONENTS.md

2. **Review Logs**
   - Browser console (F12)
   - Terminal output
   - Network tab

3. **Report Issues**
   - GitHub Issues
   - Include error messages
   - Provide reproduction steps
   - Share browser/OS info

## Tips & Best Practices

### Writing Better Ticket Descriptions

**Do:**
- ✅ Include error messages verbatim
- ✅ Specify affected user count
- ✅ Mention when issue started
- ✅ List steps to reproduce
- ✅ Include relevant URLs/IDs
- ✅ Note any recent changes

**Don't:**
- ❌ Use vague descriptions
- ❌ Omit error details
- ❌ Forget user impact
- ❌ Skip reproduction steps
- ❌ Leave out context

**Example - Poor Description:**
```
"Login not working"
```

**Example - Good Description:**
```
"Users report 500 Internal Server Error when attempting to log in 
via the main login page (https://app.example.com/login). Issue 
started approximately 2 hours ago at 14:30 UTC. Approximately 150 
users affected based on error logs. Browser console shows: 
'POST /api/auth/login failed with status 500'. No recent deployments 
or configuration changes."
```

### Maximizing Analysis Quality

1. **Provide Context**
   - When did it start?
   - How many users affected?
   - What changed recently?

2. **Include Technical Details**
   - Error codes
   - Stack traces
   - Log excerpts
   - API responses

3. **Specify Impact**
   - User experience
   - Business operations
   - Revenue implications

4. **Add Reproduction Steps**
   - Step-by-step instructions
   - Expected vs actual behavior
   - Environment details

### Workflow Integration

**With Jira:**
1. Analyze ticket in Ticket Inteli
2. Copy Engineering Handoff
3. Create Jira ticket
4. Paste handoff as description
5. Set priority based on severity
6. Assign to team from recommendation

**With Slack:**
1. Analyze critical issues immediately
2. Copy relevant sections
3. Post in incident channel
4. Tag appropriate teams
5. Share resolution steps
6. Update with progress

**With Email:**
1. Analyze customer-reported issues
2. Copy Customer Communication
3. Customize for brand voice
4. Send to affected customers
5. Include time estimate
6. Provide update schedule

### Team Collaboration

**For Support Teams:**
- Use for initial triage
- Standardize ticket quality
- Reduce escalation time
- Improve customer communication

**For Engineering Teams:**
- Get structured handoffs
- Prioritize by business impact
- Learn from similar tickets
- Plan testing scope

**For Management:**
- Track time saved
- Monitor severity trends
- Measure response times
- Justify resource allocation

## Practice Exercises

### Exercise 1: Critical Issue

Analyze this ticket:
```
Title: "Database connection failures"
Description: "Application showing 'Database connection timeout' 
errors. All users unable to access any features. Started 10 minutes 
ago. Error rate: 100% of requests."
```

**Expected Results:**
- Severity: Critical
- High business impact
- Database product area
- Immediate escalation

### Exercise 2: Payment Problem

Analyze this ticket:
```
Title: "Credit card charges failing"
Description: "Customers report credit card payments are being 
declined even with valid cards. Issue affects approximately 30% 
of payment attempts. Started 1 hour ago. Stripe API returning 
'gateway_timeout' errors."
```

**Expected Results:**
- Severity: High
- Revenue impact noted
- Billing/API product areas
- Payment gateway root cause

### Exercise 3: Performance Issue

Analyze this ticket:
```
Title: "Reports page loading slowly"
Description: "Users report the analytics reports page takes 30-45 
seconds to load, normally loads in 2-3 seconds. Affects about 20 
users. Started this morning after database maintenance."
```

**Expected Results:**
- Severity: Medium
- Performance product area
- Database-related root cause
- Optimization recommendations

## Next Steps

After completing this tutorial:

1. **Practice with Sample Tickets**
   - Try all four sample tickets
   - Compare results
   - Understand severity differences

2. **Analyze Real Tickets**
   - Start with low-priority issues
   - Build confidence
   - Refine descriptions

3. **Integrate into Workflow**
   - Add to triage process
   - Train team members
   - Measure time savings

4. **Provide Feedback**
   - Report issues
   - Suggest improvements
   - Share success stories

5. **Explore Advanced Features**
   - API integration
   - Automation workflows
   - Custom configurations

## Additional Resources

- **[README.md](../README.md)** - Project overview
- **[API.md](API.md)** - API documentation
- **[COMPONENTS.md](COMPONENTS.md)** - Component guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions

---

**Tutorial Version:** 1.0  
**Last Updated:** May 17, 2026  
**Feedback:** [GitHub Issues](https://github.com/yourusername/ticket-inteli/issues)