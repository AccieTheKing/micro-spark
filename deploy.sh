#!/bin/bash
set -e

cd ~/projects/micro-spark

echo "Pulling latest code..."
git pull origin master

echo "Stop current container"
docker compose down

echo "Starting new container"
docker compose up -d --build
