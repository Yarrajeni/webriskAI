# Multi-stage Dockerfile for RiskAI MLOps Platform

# Stage 1: Build Frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend & Final Image
FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/frontend/dist ./static

# Copy backend source
COPY backend/ ./backend

# Environment variables
ENV PORT=8000
ENV DATABASE_URL=sqlite:///./risk_app.db

# Expose port
EXPOSE 8000

# Start command (using uvicorn to serve FastAPI)
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
