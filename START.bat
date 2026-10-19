@echo off
echo ========================================
echo E-Commerce Website Startup Script
echo ========================================
echo.

REM Check if node is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Run reorganization script if frontend folder doesn't exist
if not exist "frontend" (
    echo.
    echo Reorganizing folder structure...
    node REORGANIZE.js
    echo.
)

REM Navigate to backend folder
cd backend

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo.
    echo Installing backend dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo ✓ Setup complete - Backend ready
echo ========================================
echo.
echo Starting server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
npm start
