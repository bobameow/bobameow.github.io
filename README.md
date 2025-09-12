# Personal Trainer Bot

Telegram bot that guides a rotating Push/Pull/Legs workout. Built with Python 3.11 and `python-telegram-bot` v21.

## Features
- 3-day rotation with automatic weight progression.
- 30‑minute workout sessions with rest timers.
- Local JSON persistence per user in `./data` (no database).
- CSV-like workout summary at end of each session.

## Setup
1. Create a Telegram bot via [@BotFather](https://t.me/BotFather) and obtain the token.
2. Clone this repository and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the bot:
   ```bash
   TELEGRAM_BOT_TOKEN=<your token> python main.py
   ```

## Docker
Build and run using Docker:
```bash
docker build -t trainer-bot .
docker run -e TELEGRAM_BOT_TOKEN=<your token> trainer-bot
```

## Data
User data is stored in `./data/{user_id}.json`. Ensure the container has a writable volume if persistence is desired.

