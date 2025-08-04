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

## Project Structure
- `tests/`: Contains test files
- `pages/`: Page Object Models
- `pomdata.json`: Test data
- `.github/workflows/`: GitHub Actions workflow configuration

## GitHub Workflow
The GitHub workflow is configured to:
1. Run tests automatically every Thursday
2. Allow manual triggering
3. Send test results to Telegram
4. Upload test reports as artifacts

## Environment Variables
Store your sensitive information in the `.env` file locally and in GitHub Secrets for CI/CD:

```
TELEGRAM_TO=your_telegram_chat_id
TELEGRAM_TOKEN=your_telegram_bot_token
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