# WatsonX API Troubleshooting Guide

## Current Status

✅ **API Key**: Working correctly  
❌ **Project ID**: Invalid format - needs correction

## Issue: Invalid Project ID Format

The current project ID in `.env` is:
```
d74ef5a-2144-4872-961c-1749cc2f046f
```

**Problem**: This is missing one character in the first segment. A valid UUID v4 must have the format:
```
xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
(8 chars)-(4)-(4)-(4)-(12 chars)
```

Your project ID has only 7 characters in the first segment instead of 8.

## How to Get the Correct Project ID

### Method 1: From WatsonX.ai Project Settings

1. Go to [IBM watsonx.ai](https://dataplatform.cloud.ibm.com/wx/home)
2. Sign in with your IBM Cloud account
3. Open your project
4. Click on the **Manage** tab
5. Look for **Project ID** in the General section
6. Copy the complete UUID (should be 36 characters including dashes)

### Method 2: From IBM Cloud Console

1. Go to [IBM Cloud Console](https://cloud.ibm.com/)
2. Navigate to **Resource list**
3. Find your Watson Studio or watsonx.ai service
4. Click on the service name
5. Go to **Projects** section
6. Find your project and copy the Project ID

### Method 3: Using IBM Cloud CLI

```bash
# Install IBM Cloud CLI if not already installed
# https://cloud.ibm.com/docs/cli

# Login
ibmcloud login

# List projects
ibmcloud resource service-instances --service-name watsonx

# Get project details
ibmcloud resource service-instance <project-name>
```

## Update Your .env File

Once you have the correct project ID:

1. Open `.env` file in the project root
2. Update the `WATSONX_PROJECT_ID` line:
   ```
   WATSONX_PROJECT_ID=your-complete-uuid-here
   ```
3. Save the file
4. Run the test again:
   ```bash
   node scripts/test-watsonx-api.js
   ```

## Example of Valid Project ID

```
WATSONX_PROJECT_ID=a1b2c3d4-5678-4abc-9def-123456789012
```

Note the format:
- First segment: 8 characters (a1b2c3d4)
- Second segment: 4 characters (5678)
- Third segment: 4 characters starting with '4' (4abc)
- Fourth segment: 4 characters (9def)
- Fifth segment: 12 characters (123456789012)

## Test Results So Far

### ✅ Passed Tests
- Environment variables are loaded correctly
- WatsonX client initializes successfully
- API key authentication works

### ❌ Failed Tests
- Text generation (due to invalid project ID)
- Ticket analysis (due to invalid project ID)

## Next Steps

1. Get the correct project ID from watsonx.ai
2. Update the `.env` file
3. Run the test script again: `node scripts/test-watsonx-api.js`
4. Once all tests pass, start the development server: `npm run dev`
5. Test the application at http://localhost:3000

## Additional Resources

- [WatsonX.ai Documentation](https://www.ibm.com/docs/en/watsonx-as-a-service)
- [IBM Cloud API Keys](https://cloud.ibm.com/iam/apikeys)
- [WatsonX Projects](https://dataplatform.cloud.ibm.com/wx/home)

## Support

If you continue to have issues:
1. Verify your IBM Cloud account has access to watsonx.ai
2. Ensure your project is in the same region as your API endpoint (us-south)
3. Check that your API key has the necessary permissions
4. Try creating a new project in watsonx.ai if the current one has issues