#!/bin/bash
set -e

cd ~/projects/micro-spark

echo "Pulling latest code..."
git pull origin master

echo "Stop current container"
docker compose stop micro-spark

echo "Starting new container"
docker compose up -d --build
