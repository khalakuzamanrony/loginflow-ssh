# Playwright Automation Project

## Overview
This is an automation project using Playwright for automated testing. The tests are scheduled to run every Thursday at 12PM BDT (6AM UTC) via GitHub Actions, with results sent to Telegram.

## Setup

### Local Setup
1. Clone the repository
2. Install dependencies: `npm ci`
3. Install Playwright browsers: `npx playwright install --with-deps`
4. Create a `.env` file with your Telegram credentials (see `.env.example`)
5. Run tests: `npx playwright test`

### GitHub Actions Setup
To run this workflow in GitHub Actions, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following repository secrets:
   - `TELEGRAM_TO`: Your Telegram chat ID
   - `TELEGRAM_TOKEN`: Your Telegram bot token
   - `SLACK_WEBHOOK_URL`: Your Slack webhook URL for notifications

## Project Structure
- `tests/`: Contains test files
- `pages/`: Page Object Models
- `pomdata.json`: Test data
- `.github/workflows/`: GitHub Actions workflow configuration

## GitHub Workflow
The GitHub workflow is configured to:
1. Run tests automatically every Thursday
2. Allow manual triggering
3. Send detailed test results to Telegram with the following information:
   - Repository name
   - Workflow name
   - Test status
   - Trigger event
   - Test counts (passed, failed, skipped)
   - List of test names
   - Detailed summary
4. Send detailed test results to Slack with a rich interactive format including:
   - Repository and workflow information
   - Test statistics
   - List of tests
   - Interactive buttons to view reports and artifacts
5. Upload test reports as artifacts

## Environment Variables
Store your sensitive information in the `.env` file locally and in GitHub Secrets for CI/CD:

```
TELEGRAM_TO=your_telegram_chat_id
TELEGRAM_TOKEN=your_telegram_bot_token
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

**Note:** Never commit the `.env` file to your repository. It's already added to `.gitignore`.

## Troubleshooting

### "Bad Request: chat not found" Error
If you encounter this error in GitHub Actions, it means your Telegram chat ID is incorrect or the bot doesn't have permission to send messages to that chat. Follow these steps to fix it:

1. **Create a Telegram Bot (if you haven't already)**:
   - Open Telegram and search for `@BotFather`
   - Send the command `/newbot` and follow the instructions
   - You'll receive a token for your bot (this is your `TELEGRAM_TOKEN`)

2. **Get the correct Chat ID**:
   - **Important**: You must start a conversation with your bot first! Send a message to your bot.
   - Method 1: Add `@RawDataBot` to a chat and it will show you the chat ID
   - Method 2: Send a message to your bot, then visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Look for the `"id"` field in the `"chat"` object - this is your `TELEGRAM_TO` value

3. **Verify your bot works**:
   - Test sending a message manually using this URL in your browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage?chat_id=<YOUR_CHAT_ID>&text=Test
   ```
   - If this works, your bot is correctly configured

4. **Update GitHub Secrets**:
   - Make sure to use the numeric chat ID (e.g., `123456789`) for the `TELEGRAM_TO` secret
   - Double-check that your `TELEGRAM_TOKEN` is correct and includes the full token

### Setting Up Slack Webhook
To receive notifications in Slack, you need to create a webhook URL:

1. **Create a Slack App**:
   - Go to [Slack API Apps page](https://api.slack.com/apps)
   - Click "Create New App" and choose "From scratch"
   - Name your app and select your workspace

2. **Enable Incoming Webhooks**:
   - In your app settings, go to "Incoming Webhooks"
   - Toggle "Activate Incoming Webhooks" to On
   - Click "Add New Webhook to Workspace"
   - Select the channel where you want to receive notifications

3. **Copy the Webhook URL**:
   - After authorizing, you'll see a new webhook URL
   - Copy this URL - this is your `SLACK_WEBHOOK_URL`

4. **Add to GitHub Secrets**:
   - Add the webhook URL as a secret named `SLACK_WEBHOOK_URL` in your GitHub repository
   - Make sure to include the complete URL starting with "https://hooks.slack.com/services/"

### Troubleshooting Slack Notifications

If you encounter errors with Slack notifications such as `no_text` or `Request failed with status code 400`, follow these steps:

1. **Check Payload Format**:
   - The Slack GitHub Action requires a properly formatted JSON payload
   - Our workflow uses the `payload` parameter with a JSON structure that includes:
     - A `text` field for the fallback message
     - A `blocks` array with formatted content

2. **Verify Webhook URL**:
   - Ensure your webhook URL is correctly formatted and valid
   - The URL should start with `https://hooks.slack.com/services/`
   - Check that the secret is properly set in GitHub Secrets

3. **Test Webhook Manually**:
   - You can test your webhook with a simple cURL command:
   ```
   curl -X POST -H 'Content-type: application/json' --data '{"text":"Hello, World!"}' YOUR_WEBHOOK_URL
   ```
   - Replace `YOUR_WEBHOOK_URL` with your actual webhook URL
   - If successful, you should see a message in your Slack channel

### Troubleshooting Test Output Processing

If you encounter errors like `Unable to process file command 'output' successfully` or `Invalid format` when running the GitHub workflow, it may be related to how test results are being processed. The workflow has been updated to handle these issues, but here are some troubleshooting steps:

1. **Check Test Output Format**:
   - The workflow extracts test results using grep, awk, and sed commands
   - If your test output format changes, you may need to update these commands
   - The current implementation handles the standard Playwright output format

2. **Default Values for Missing Data**:
   - The workflow now provides default values ("0") for missing test counts
   - If test results don't include passed/failed/skipped counts, the workflow will use these defaults

3. **Error Handling**:
   - Commands now include error handling with `|| true` and `|| echo "default value"`
   - This prevents the workflow from failing if a command doesn't find matching output

4. **Manual Testing**:
   - You can test the output processing locally by running:
   ```
   npx playwright test | tee test-output.txt
   cat test-output.txt | grep -E '[0-9]+ passed.*[0-9]+s' | tail -1
   ```
   - This should show the summary line that will be used in notifications