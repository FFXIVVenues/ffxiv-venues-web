#!/bin/sh
set -e

# Build the app with environment variables
npm run build

# Copy built files to nginx directory
cp -r /app/dist/* /www

# Start nginx
nginx -g "daemon off;"
