@echo off
REM BulkPay Local Development Setup Script (Neon DB)

echo ========================================
echo BulkPay Local Development Setup
echo ========================================
echo.

echo [1/3] Verifying backend setup...
cd apps\backend
if not exist .env (
    echo ERROR: apps\backend\.env not found. Add your Neon DATABASE_URL there.
    pause
    exit /b 1
)

echo [2/3] Installing backend dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

echo.
echo [3/3] Running database migrations...
call npx prisma migrate deploy
if errorlevel 1 (
    echo WARNING: Migrations may have failed. Check the output above.
) else (
    echo ✓ Migrations applied
)

cd ..\..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Backend Configuration:
echo   - Ensure apps\backend\.env has your Neon DATABASE_URL

echo Next steps:
echo   1. Start the backend: cd apps/backend && npm run start:dev
echo   2. Start the mobile app: cd apps/mobile && npm start
echo   3. The API will be available at http://localhost:3000

echo.
pause
