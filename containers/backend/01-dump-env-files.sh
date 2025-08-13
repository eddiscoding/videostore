#!/bin/sh

# Sync secrets to .env file
# IMPORTANT: Symfony NEEDS the variables to be in a .env file
# in order to properly function

# Check that required environment variables are set
: "${INFISICAL_CLIENT_ID:?Environment variable INFISICAL_CLIENT_ID not set}"
: "${INFISICAL_CLIENT_SECRET:?Environment variable INFISICAL_CLIENT_SECRET not set}"
: "${INFISICAL_DOMAIN:?Environment variable INFISICAL_DOMAIN not set}"
: "${INFISICAL_PROJECT_ID:?Environment variable INFISICAL_PROJECT_ID not set}"

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

echo "Dumping variables into .env files..."

dirs=$(echo "$INFISICAL_PATHS" | tr -d '[]' | tr ',' ' ')

echo "" > .env.dev
echo "" > .env.prod

for dir in $dirs; do
  echo "Exporting dev secrets for $dir..."
  echo "#################################### ${dir}" >> .env.dev
  infisical export \
    --domain="$INFISICAL_DOMAIN" \
    --projectId="$INFISICAL_PROJECT_ID" \
    --env=dev \
    --path="/$dir" \
    --format=dotenv >> ".env.dev"
done

for dir in $dirs; do
  echo "Exporting prod secrets for $dir..."
  echo "#################################### ${dir}" >> .env.prod
  infisical export \
    --domain="$INFISICAL_DOMAIN" \
    --projectId="$INFISICAL_PROJECT_ID" \
    --env=prod \
    --path="/$dir" \
    --format=dotenv >> ".env.prod"
done

echo "Resuming default image entrypoint scripts..."