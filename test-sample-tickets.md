# Sample Ticket Preload Test Plan

## Test Objective
Verify that sample tickets properly preload into the form fields when selected from the dropdown.

## Test Environment
- Application running at: http://localhost:3000
- Test page: /analyze

## Test Cases

### Test Case 1: TICK-001 - Login page not loading
**Steps:**
1. Navigate to http://localhost:3000/analyze
2. Locate the "Try a Sample Ticket" dropdown
3. Select "TICK-001: Login page not loading"
4. Verify the form fields are populated

**Expected Results:**
- Title field should contain: "Login page not loading"
- Description field should contain: "When I try to access the login page, I get a blank white screen. This started happening after the latest update yesterday. I've tried clearing my cache and using different browsers (Chrome, Firefox, Safari) but the issue persists. This is blocking me from accessing my account and I have urgent work to complete."
- Character count should show: 337 characters
- Toast notification should appear: "Sample Loaded: Login page not loading"
- Form validation should pass (no errors)
- "Analyze Ticket" button should be enabled

### Test Case 2: TICK-002 - Payment processing fails intermittently
**Steps:**
1. From the analyze page, select "TICK-002: Payment processing fails intermittently"
2. Verify the form fields are populated

**Expected Results:**
- Title field should contain: "Payment processing fails intermittently"
- Description field should contain the full payment issue description (approx. 394 characters)
- Toast notification should appear
- Form should be ready to submit

### Test Case 3: TICK-003 - Dashboard charts showing incorrect data
**Steps:**
1. From the analyze page, select "TICK-003: Dashboard charts showing incorrect data"
2. Verify the form fields are populated

**Expected Results:**
- Title field should contain: "Dashboard charts showing incorrect data"
- Description field should contain the full dashboard issue description (approx. 346 characters)
- Toast notification should appear
- Form should be ready to submit

### Test Case 4: Submit Preloaded Sample
**Steps:**
1. Select any sample ticket
2. Click "Analyze Ticket" button without modifying the fields
3. Wait for analysis to complete

**Expected Results:**
- Analysis should complete successfully
- Results should be displayed
- No validation errors should occur

### Test Case 5: Switch Between Samples
**Steps:**
1. Select TICK-001
2. Verify fields are populated
3. Select TICK-002
4. Verify fields update to TICK-002 data
5. Select TICK-003
6. Verify fields update to TICK-003 data

**Expected Results:**
- Each selection should properly update both fields
- Previous data should be completely replaced
- No validation errors should persist between selections
- Toast notification should appear for each selection

### Test Case 6: Edit Preloaded Sample
**Steps:**
1. Select a sample ticket
2. Modify the title or description
3. Submit the form

**Expected Results:**
- Modified content should be submitted
- Analysis should work with modified content

## Manual Testing Instructions

1. Open your browser to http://localhost:3000/analyze
2. Execute each test case above
3. Document any failures or unexpected behavior
4. Verify the dropdown is accessible and keyboard-navigable

## Success Criteria
✅ All sample tickets load correctly into form fields
✅ Character counts update properly
✅ Form validation works with preloaded data
✅ Toast notifications appear for each selection
✅ Switching between samples works smoothly
✅ Submit functionality works with preloaded samples