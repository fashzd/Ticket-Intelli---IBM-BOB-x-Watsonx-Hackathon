# WatsonX.ai Integration Setup Guide

> Complete guide to integrating IBM watsonx.ai with Ticket Inteli for AI-powered ticket analysis

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Step 1: Create IBM Cloud Account](#step-1-create-ibm-cloud-account)
- [Step 2: Set Up watsonx.ai Project](#step-2-set-up-watsonxai-project)
- [Step 3: Generate API Key](#step-3-generate-api-key)
- [Step 4: Configure Environment Variables](#step-4-configure-environment-variables)
- [Step 5: Test the Integration](#step-5-test-the-integration)
- [Verifying Integration Status](#verifying-integration-status)
- [Troubleshooting](#troubleshooting)
- [Advanced Configuration](#advanced-configuration)
- [Cost Considerations](#cost-considerations)
- [Security Best Practices](#security-best-practices)

## 🎯 Overview

Ticket Inteli can use IBM watsonx.ai for advanced AI-powered ticket analysis. The application automatically falls back to mock analysis if watsonx.ai credentials are not configured, making it easy to develop and test without requiring immediate access to IBM Cloud.

### Integration Benefits

- **Advanced AI Analysis**: Leverage IBM's enterprise-grade AI models
- **Improved Accuracy**: Better severity detection and root cause analysis
- **Natural Language Understanding**: More nuanced interpretation of ticket content
- **Continuous Learning**: Models improve over time with usage
- **Enterprise Support**: IBM's support and SLAs for production deployments

### Fallback Behavior

Without watsonx.ai credentials, the application uses a sophisticated mock analyzer that:
- Provides realistic analysis based on keyword detection
- Maintains the same API interface
- Allows full application testing and development
- Displays a clear indicator that mock mode is active

## ✅ Prerequisites

Before starting, ensure you have:

- [ ] A valid email address
- [ ] Credit card (for IBM Cloud account verification - free tier available)
- [ ] Node.js 18+ installed locally
- [ ] Ticket Inteli project cloned and dependencies installed
- [ ] Basic understanding of environment variables

**Estimated Setup Time**: 15-20 minutes

## 📝 Step 1: Create IBM Cloud Account

### 1.1 Sign Up for IBM Cloud

1. Visit [IBM Cloud Registration](https://cloud.ibm.com/registration)
2. Fill in your details:
   - Email address
   - First and last name
   - Country/Region
   - Password (must meet complexity requirements)
3. Accept the terms and conditions
4. Click **"Create Account"**
5. Verify your email address by clicking the link sent to your inbox

### 1.2 Complete Account Setup

1. Log in to [IBM Cloud Console](https://cloud.ibm.com/)
2. Complete any additional verification steps (may require phone verification)
3. Add payment information (required even for free tier)
   - IBM Cloud offers a free tier with generous limits
   - You won't be charged unless you exceed free tier limits

### 1.3 Verify Account Status

- Ensure your account status shows as **"Active"**
- Check that you can access the IBM Cloud dashboard
- Verify you have access to create new services

**Troubleshooting**: If you encounter issues, contact [IBM Cloud Support](https://cloud.ibm.com/unifiedsupport/supportcenter)

## 🚀 Step 2: Set Up watsonx.ai Project

### 2.1 Access watsonx.ai

1. Log in to [IBM Cloud](https://cloud.ibm.com/)
2. Navigate to the **Catalog** (top navigation bar)
3. Search for **"watsonx.ai"** or find it under **AI / Machine Learning**
4. Click on **"watsonx.ai"**

### 2.2 Create a watsonx.ai Instance

1. Click **"Create"** or **"Get Started"**
2. Select your region (recommended: **US South** for best performance)
3. Choose a pricing plan:
   - **Lite Plan**: Free tier with limited capacity (good for testing)
   - **Essentials Plan**: Pay-as-you-go for production use
4. Give your instance a name (e.g., "ticket-inteli-watsonx")
5. Click **"Create"**

### 2.3 Create a Project

1. After instance creation, click **"Launch watsonx.ai"**
2. You'll be redirected to the watsonx.ai platform
3. Click **"Create a project"** or navigate to **Projects** → **"New project"**
4. Choose **"Create an empty project"**
5. Fill in project details:
   - **Name**: "Ticket Inteli Analysis" (or your preferred name)
   - **Description**: "AI-powered support ticket analysis and triage"
   - **Storage**: Select or create a Cloud Object Storage instance
6. Click **"Create"**

### 2.4 Get Your Project ID

1. Open your newly created project
2. Click on the **"Manage"** tab
3. Navigate to **"General"** section
4. Find and copy your **Project ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
5. Save this ID - you'll need it for configuration

**Important**: Keep your Project ID secure and never commit it to public repositories.

## 🔑 Step 3: Generate API Key

### 3.1 Navigate to API Keys

1. From IBM Cloud dashboard, click your profile icon (top right)
2. Select **"Manage"** → **"Access (IAM)"**
3. In the left sidebar, click **"API keys"**

### 3.2 Create New API Key

1. Click **"Create"** or **"Create an IBM Cloud API key"**
2. Fill in the details:
   - **Name**: "ticket-inteli-api-key" (or descriptive name)
   - **Description**: "API key for Ticket Inteli watsonx.ai integration"
3. Click **"Create"**

### 3.3 Save Your API Key

1. **IMPORTANT**: Copy the API key immediately - it will only be shown once!
2. Click **"Download"** to save a copy to your computer
3. Store it securely (password manager recommended)
4. Click **"Close"**

**Security Warning**: 
- Never share your API key
- Never commit it to version control
- Rotate keys regularly (every 90 days recommended)
- If compromised, delete and create a new key immediately

## ⚙️ Step 4: Configure Environment Variables

### 4.1 Create Environment File

1. Navigate to your Ticket Inteli project directory
2. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

### 4.2 Edit Configuration

Open `.env.local` in your text editor and fill in your credentials:

```bash
# IBM Cloud API Key (from Step 3)
WATSONX_API_KEY=your_actual_api_key_here

# WatsonX Project ID (from Step 2.4)
WATSONX_PROJECT_ID=your_actual_project_id_here

# WatsonX Service URL (match your instance region)
WATSONX_URL=https://us-south.ml.cloud.ibm.com

# WatsonX Model ID (recommended default)
WATSONX_MODEL_ID=ibm/granite-3-8b-instruct
```

### 4.3 Region-Specific URLs

Choose the URL that matches your watsonx.ai instance region:

| Region | URL |
|--------|-----|
| US South (Dallas) | `https://us-south.ml.cloud.ibm.com` |
| EU Germany (Frankfurt) | `https://eu-de.ml.cloud.ibm.com` |
| EU UK (London) | `https://eu-gb.ml.cloud.ibm.com` |
| Asia Pacific (Tokyo) | `https://jp-tok.ml.cloud.ibm.com` |

### 4.4 Model Selection

Recommended models for ticket analysis:

| Model | Best For | Performance |
|-------|----------|-------------|
| `ibm/granite-3-8b-instruct` | **Recommended** - Balanced performance and cost | Fast, accurate |
| `ibm/granite-13b-instruct-v2` | Higher accuracy, slower | More detailed |
| `meta-llama/llama-3-70b-instruct` | Maximum accuracy | Slower, higher cost |

### 4.5 Verify File Security

Ensure `.env.local` is in `.gitignore`:

```bash
# Check if .env.local is ignored
git check-ignore .env.local
```

Expected output: `.env.local` (confirms it's ignored)

## 🧪 Step 5: Test the Integration

### 5.1 Restart Development Server

If your server is running, restart it to load the new environment variables:

```bash
# Stop the server (Ctrl+C)
# Start it again
npm run dev
```

### 5.2 Test with Sample Ticket

1. Open your browser to `http://localhost:3000`
2. Navigate to the **Analyze** page
3. Click **"Try Sample Ticket"**
4. Select **"Login Page 500 Error"**
5. Click **"Analyze Ticket"**

### 5.3 Verify watsonx.ai is Active

Look for these indicators that watsonx.ai is working:

✅ **Success Indicators**:
- Analysis completes in 3-5 seconds (slightly longer than mock)
- Results show more detailed and nuanced analysis
- No "Mock Mode" indicator in the UI
- Console logs show watsonx.ai API calls (check browser DevTools)

❌ **Fallback to Mock**:
- Analysis completes in <1 second
- "Using Mock Analysis" indicator appears
- Console shows "WatsonX not configured" message

### 5.4 Check Console Logs

Open browser DevTools (F12) and check the Console tab:

**Success**:
```
✓ WatsonX analyzer initialized
✓ Analysis completed via watsonx.ai
```

**Fallback**:
```
⚠ WatsonX not configured, using mock analyzer
✓ Analysis completed via mock analyzer
```

## 🔍 Verifying Integration Status

### Method 1: UI Indicator

The application displays a status indicator:
- **Green badge**: "Powered by watsonx.ai" - Integration active
- **Yellow badge**: "Mock Analysis Mode" - Using fallback

### Method 2: API Response

Check the API response for the `analysisMode` field:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test ticket",
    "description": "Testing watsonx integration"
  }'
```

Response includes:
```json
{
  "analysisMode": "watsonx",  // or "mock"
  "severity": "medium",
  ...
}
```

### Method 3: Server Logs

Check your terminal where `npm run dev` is running:

**watsonx.ai active**:
```
[watsonx] Initializing with project: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
[watsonx] Analysis request sent to IBM Cloud
[watsonx] Response received: 200 OK
```

**Mock fallback**:
```
[mock] WatsonX credentials not found
[mock] Using mock analyzer for ticket analysis
```

## 🔧 Troubleshooting

### Issue: "Invalid API Key" Error

**Symptoms**: 401 Unauthorized error, "Invalid API key" message

**Solutions**:
1. Verify API key is copied correctly (no extra spaces)
2. Check that API key hasn't been deleted in IBM Cloud
3. Ensure API key has proper permissions:
   - Go to IBM Cloud → Manage → Access (IAM) → API keys
   - Verify key exists and is active
4. Try creating a new API key

### Issue: "Project Not Found" Error

**Symptoms**: 404 error, "Project ID not found"

**Solutions**:
1. Verify Project ID is correct (check watsonx.ai project settings)
2. Ensure API key has access to the project:
   - Open project in watsonx.ai
   - Go to Manage → Access Control
   - Verify your user has at least "Editor" role
3. Check that project is in the same region as your WATSONX_URL

### Issue: Application Still Using Mock

**Symptoms**: Fast analysis, mock indicator showing

**Solutions**:
1. Verify `.env.local` file exists in project root
2. Check all required variables are set:
   ```bash
   cat .env.local | grep WATSONX
   ```
3. Restart development server completely:
   ```bash
   # Kill all node processes
   pkill -f "next dev"
   # Start fresh
   npm run dev
   ```
4. Check for typos in variable names (must be exact)

### Issue: Slow Response Times

**Symptoms**: Analysis takes >10 seconds

**Solutions**:
1. Check your internet connection
2. Verify you're using the closest region URL
3. Consider using a smaller model (granite-3-8b-instruct)
4. Check IBM Cloud status: https://cloud.ibm.com/status

### Issue: Rate Limit Exceeded

**Symptoms**: 429 error, "Rate limit exceeded"

**Solutions**:
1. Wait a few minutes before retrying
2. Check your plan limits in IBM Cloud
3. Consider upgrading to a higher tier plan
4. Implement request throttling in your application

### Issue: Environment Variables Not Loading

**Symptoms**: Variables are undefined in code

**Solutions**:
1. Ensure file is named exactly `.env.local` (not `.env.local.txt`)
2. Verify file is in project root directory
3. Check file permissions:
   ```bash
   ls -la .env.local
   ```
4. Restart your IDE/editor
5. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### Getting Help

If issues persist:

1. **Check IBM Cloud Status**: https://cloud.ibm.com/status
2. **Review watsonx.ai Docs**: https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html
3. **IBM Support**: https://cloud.ibm.com/unifiedsupport/supportcenter
4. **Project Issues**: Open an issue on GitHub with:
   - Error messages (redact credentials!)
   - Steps to reproduce
   - Environment details (OS, Node version)

## 🔐 Advanced Configuration

### Custom Model Parameters

You can fine-tune model behavior by modifying `src/lib/watsonxAnalyzer.ts`:

```typescript
const parameters = {
  max_new_tokens: 2000,      // Maximum response length
  temperature: 0.7,          // Creativity (0.0-1.0)
  top_p: 0.9,               // Nucleus sampling
  top_k: 50,                // Top-k sampling
  repetition_penalty: 1.1,  // Prevent repetition
};
```

### Multiple Environments

For different environments (dev, staging, prod):

**Development** (`.env.local`):
```bash
WATSONX_API_KEY=dev_key
WATSONX_PROJECT_ID=dev_project_id
```

**Production** (Vercel/hosting platform):
- Set environment variables in hosting platform dashboard
- Use separate API keys for each environment
- Consider using different projects for isolation

### Monitoring and Logging

Enable detailed logging:

```bash
# Add to .env.local
DEBUG=watsonx:*
LOG_LEVEL=debug
```

### Caching Responses

To reduce API calls and costs, implement caching:

1. Use Redis or similar for response caching
2. Cache based on ticket content hash
3. Set appropriate TTL (e.g., 24 hours)
4. Clear cache when model is updated

## 💰 Cost Considerations

### Free Tier Limits

IBM Cloud Lite plan includes:
- **Capacity Units**: Limited free capacity per month
- **API Calls**: Generous free tier for testing
- **Storage**: Free Cloud Object Storage tier

### Pricing Factors

Costs depend on:
1. **Model Size**: Larger models cost more per token
2. **Token Count**: Input + output tokens
3. **Request Volume**: Number of analyses per month
4. **Region**: Prices may vary by region

### Cost Optimization Tips

1. **Use Smaller Models**: granite-3-8b-instruct is cost-effective
2. **Implement Caching**: Avoid re-analyzing identical tickets
3. **Batch Processing**: Process multiple tickets together when possible
4. **Monitor Usage**: Set up billing alerts in IBM Cloud
5. **Optimize Prompts**: Shorter prompts = lower costs

### Estimated Costs

For a team analyzing 50 tickets/day:
- **Lite Plan**: Free for first ~1000 tickets/month
- **Essentials Plan**: ~$50-100/month (varies by model)
- **Enterprise**: Custom pricing for high volume

**Recommendation**: Start with Lite plan, monitor usage, upgrade as needed.

## 🔒 Security Best Practices

### Credential Management

1. **Never Commit Credentials**:
   ```bash
   # Verify .env.local is ignored
   git status --ignored
   ```

2. **Use Environment Variables**: Never hardcode credentials in code

3. **Rotate Keys Regularly**: Create new API keys every 90 days

4. **Limit Key Permissions**: Use least-privilege principle

5. **Monitor Key Usage**: Check IBM Cloud for unusual activity

### Production Security

1. **Use Secrets Management**:
   - AWS Secrets Manager
   - Azure Key Vault
   - HashiCorp Vault

2. **Enable Audit Logging**: Track all API calls in IBM Cloud

3. **Implement Rate Limiting**: Prevent abuse and control costs

4. **Use HTTPS Only**: Ensure all API calls are encrypted

5. **Validate Input**: Sanitize ticket content before sending to API

### Compliance Considerations

- **Data Residency**: Choose appropriate region for data compliance
- **GDPR**: Ensure customer data handling complies with regulations
- **SOC 2**: IBM Cloud is SOC 2 certified
- **HIPAA**: Available with IBM Cloud HIPAA-enabled services

## 📚 Additional Resources

### Documentation

- [watsonx.ai Documentation](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-overview.html)
- [IBM Cloud API Docs](https://cloud.ibm.com/apidocs)
- [Granite Models Guide](https://www.ibm.com/products/watsonx-ai/foundation-models)

### Tutorials

- [Getting Started with watsonx.ai](https://www.ibm.com/docs/en/watsonx-as-a-service)
- [Prompt Engineering Best Practices](https://www.ibm.com/docs/en/watsonx/saas?topic=lab-prompt-tips)
- [Model Fine-tuning Guide](https://www.ibm.com/docs/en/watsonx/saas?topic=models-tuning)

### Community

- [IBM Developer Community](https://developer.ibm.com/community/)
- [watsonx.ai Forum](https://community.ibm.com/community/user/watsonx/home)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/ibm-watson)

### Support

- **IBM Cloud Support**: https://cloud.ibm.com/unifiedsupport/supportcenter
- **Documentation**: https://cloud.ibm.com/docs
- **Status Page**: https://cloud.ibm.com/status

---

## ✅ Setup Checklist

Use this checklist to verify your setup:

- [ ] IBM Cloud account created and verified
- [ ] watsonx.ai instance provisioned
- [ ] watsonx.ai project created
- [ ] Project ID copied and saved
- [ ] API key generated and saved securely
- [ ] `.env.local` file created with all variables
- [ ] `.env.local` is in `.gitignore`
- [ ] Development server restarted
- [ ] Test analysis completed successfully
- [ ] watsonx.ai indicator showing (not mock mode)
- [ ] Console logs confirm watsonx.ai usage
- [ ] API key stored in password manager
- [ ] Billing alerts configured in IBM Cloud

**Congratulations!** 🎉 Your watsonx.ai integration is complete and ready for production use.

---

**Need Help?** Open an issue on GitHub or consult the [troubleshooting section](#troubleshooting) above.

**Last Updated**: May 17, 2026  
**Version**: 1.0.0