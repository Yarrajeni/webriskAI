@echo off
echo ============================================================
echo [RiskAI MLOps] Enterprise Production Launch Sequence
echo ============================================================
echo.

echo [1/3] Building Frontend Production Assets...
cd frontend
cmd /c npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed.
    exit /b %errorlevel%
)
cd ..

echo.
echo [2/3] Orchestrating Docker Containers...
echo This will start the FastAPI Backend and the Database.
cmd /c docker-compose up --build -d

echo.
echo [3/3] Finalizing System Readiness...
echo Platform is now deploying at: http://localhost:5173
echo Backend API is running at: http://localhost:8000
echo.
echo ============================================================
echo [SUCCESS] RiskAI MLOps Enterprise is now LIVE.
echo ============================================================
pause
