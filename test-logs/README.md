# Test Logs Directory

This directory contains test execution logs for the WatsonX API integration.

## Security Notice

⚠️ **IMPORTANT**: Raw log files (`.log`) may contain sensitive information and are excluded from version control.

### Protected Information
- API keys (redacted in committed files)
- Project IDs (redacted in committed files)
- Authentication tokens
- Any other credentials

### Files in This Directory

#### Committed Files
- `WATSONX_API_SUCCESS_TEST.md` - Sanitized test results with credentials redacted
- `README.md` - This file

#### Ignored Files (Not Committed)
- `*.log` - Raw terminal output logs (may contain credentials)

## Running Tests

To generate new test logs:

```bash
# Run test and save output
node scripts/test-watsonx-api.js | tee test-logs/watsonx-api-test-$(date +%Y-%m-%d-%H-%M-%S).log
```

**Note**: Raw `.log` files are automatically ignored by `.gitignore` to prevent credential exposure.

## Sanitization

All committed test documentation has been sanitized:
- API keys: `***...*** [REDACTED]`
- Project IDs: `********-****-****-****-************ [REDACTED]`

## Best Practices

1. ✅ Never commit raw `.log` files
2. ✅ Always redact credentials in documentation
3. ✅ Use `.env.example` for sharing configuration templates
4. ✅ Keep actual `.env` files out of version control
5. ✅ Review files before committing to ensure no credentials are exposed

## Viewing Test Results

For sanitized test results, see:
- `WATSONX_API_SUCCESS_TEST.md` - Comprehensive test documentation

For raw logs (local only):
- Check `*.log` files in this directory (not committed to git)