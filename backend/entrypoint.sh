#!/bin/bash

# Wait for the database to be ready
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Start the server
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000