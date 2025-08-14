#!/bin/sh

# Sync secrets to .env.local for the current APP_ENV
# IMPORTANT: Symfony NEEDS the variables to be in a .env file
# in order to properly function

# Check that required environment variables are set
: "${INFISICAL_CLIENT_ID:?Environment variable INFISICAL_CLIENT_ID not set}"
: "${INFISICAL_CLIENT_SECRET:?Environment variable INFISICAL_CLIENT_SECRET not set}"
: "${INFISICAL_DOMAIN:?Environment variable INFISICAL_DOMAIN not set}"
: "${INFISICAL_PROJECT_ID:?Environment variable INFISICAL_PROJECT_ID not set}"
: "${APP_ENV:?Environment variable APP_ENV not set}"

echo "Generating token..."

# Login to Infisical using universal auth
export INFISICAL_TOKEN=$(
  infisical login \
    --method=universal-auth \
    --client-id="$INFISICAL_CLIENT_ID" \
    --client-secret="$INFISICAL_CLIENT_SECRET" \
    --domain="$INFISICAL_DOMAIN" \
    --silent \
    --plain
)

echo "Script Running as: $(whoami)"
echo "UID: $(id -u) GUID: $(id -g)"

# Target file is always .env.local
target_env_file=".env.local"
echo "Dumping $APP_ENV secrets into $target_env_file..."

# Parse paths from INFISICAL_PATHS env variable (assumed format: [path1,path2,...])
dirs=$(echo "$INFISICAL_PATHS" | tr -d '[]' | tr ',' ' ')

# Clear the file first
echo "" > "$target_env_file"

# Loop through paths and export secrets
for dir in $dirs; do
  echo "Exporting $APP_ENV secrets for $dir..."
  echo "#################################### ${dir}" >> "$target_env_file"
  infisical export \
    --domain="$INFISICAL_DOMAIN" \
    --projectId="$INFISICAL_PROJECT_ID" \
    --env="$APP_ENV" \
    --path="/$dir" \
    --format=dotenv >> "$target_env_file"
done

echo "Resuming default image entrypoint scripts..."
