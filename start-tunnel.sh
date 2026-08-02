#!/bin/bash
# start-tunnel.sh
# Establishes a TLS tunnel using cloudflared or ngrok for secure public access.

PORT=80 # Route through the NGINX Load Balancer

echo "Starting TLS Tunnel on port $PORT..."

if command -v cloudflared &> /dev/null; then
    echo "Using cloudflared..."
    cloudflared tunnel --url http://localhost:$PORT
elif command -v ngrok &> /dev/null; then
    echo "Using ngrok..."
    ngrok http $PORT
else
    echo "Error: Neither cloudflared nor ngrok found."
    echo "Please install one to establish the TLS tunnel before deployment."
    echo "Example: npm install -g cloudflared or brew install ngrok"
    exit 1
fi
