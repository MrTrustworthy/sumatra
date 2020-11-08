#!/bin/bash

echo "Apply database migrations"
npm run migrate

# Start server
echo "Starting server"
npm run server