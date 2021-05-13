# Example ⚡️ Bolt for Python

## Getting started

### 1. Slack app settings

* Socket Mode
  * Enabled
* Slash commands
  * `/slash-command`

### 2. Setup environment variables

```zsh
# Replace with your tokens
export SLACK_APP_SECRET=<your-app-token>
export SLACK_BOT_TOKEN=<your-bot-token>
```

### 3. Setup your local project

```zsh
# Setup virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install the dependencies
pip install -r requirements.txt
```

### 4. Start servers

```zsh
python3 app.py
```

### 5. Usage

1. Type `/slash-command` in any channel
1. Search for a country, such as "Uni"
1. View the filtered results
1. Press Submit
1. (Nothing else happens)