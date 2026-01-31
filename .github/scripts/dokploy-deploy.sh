#!/bin/bash

# Required environment variables:
# DOCKPLOY_API_URL: The base URL of your Dockploy instance (e.g., https://api.dockploy.com)
# DOCKPLOY_API_TOKEN: Your Dockploy API Token
# DOCKPLOY_APPLICATION_ID: The ID of the application to deploy

set -e

if [ -z "$DOCKPLOY_API_URL" ] || [ -z "$DOCKPLOY_API_TOKEN" ] || [ -z "$DOCKPLOY_APPLICATION_ID" ]; then
  echo "❌ Error: Missing required environment variables."
  echo "Ensure DOCKPLOY_API_URL, DOCKPLOY_API_TOKEN, and DOCKPLOY_APPLICATION_ID are set."
  exit 1
fi

echo "🚀 Triggering deployment for Application ID: $DOCKPLOY_APPLICATION_ID..."

# 1. Trigger Deployment
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$DOCKPLOY_API_URL/api/application.deploy" \
  -H "Authorization: Bearer $DOCKPLOY_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"applicationId\": \"$DOCKPLOY_APPLICATION_ID\"}")

HTTP_BODY=$(echo "$RESPONSE" | head -n -1)
HTTP_STATUS=$(echo "$RESPONSE" | tail -n 1)

if [ "$HTTP_STATUS" -ne 200 ] && [ "$HTTP_STATUS" -ne 201 ]; then
  echo "❌ Failed to trigger deployment. HTTP Status: $HTTP_STATUS"
  echo "Response: $HTTP_BODY"
  exit 1
fi

echo "✅ Deployment triggered successfully. Starting monitoring..."

# 2. Monitor Status
# Poll every 5 seconds, timeout after 10 minutes (600 seconds)
TIMEOUT=600
INTERVAL=5
ELAPSED=0

while [ $ELAPSED -lt $TIMEOUT ]; do
  STATUS_RESPONSE=$(curl -s -X GET "$DOCKPLOY_API_URL/api/application.one?applicationId=$DOCKPLOY_APPLICATION_ID" \
    -H "Authorization: Bearer $DOCKPLOY_API_TOKEN")

  # Extract application status using jq (assuming the response structure has 'applicationStatus')
  # Note: Adjust the jq path depending on exact API response structure.
  # Based on standard usage, it might be nested. We'll dump the status for debugging first.
  CURRENT_STATUS=$(echo "$STATUS_RESPONSE" | jq -r '.applicationStatus // .status // "unknown"')

  echo "⏳ [$ELAPSED s] Current Status: $CURRENT_STATUS"

  case "$CURRENT_STATUS" in
    "Running"|"Idle") # Adjust "Idle" if that's a success state in Dockploy
      echo "✅ Deployment successful! Application is $CURRENT_STATUS."
      exit 0
      ;;
    "Crashed"|"Error")
      echo "❌ Deployment failed. Application status is $CURRENT_STATUS."
      exit 1
      ;;
  esac

  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
done

echo "⚠️  Timeout reached waiting for deployment status."
exit 1
