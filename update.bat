@echo off
echo ========================================
echo   ARTIST PORTFOLIO - UPDATE SCRIPT
echo ========================================
echo.

set GIT_PATH="C:\Program Files\Git\cmd\git.exe"

echo 1. Adding changes...
%GIT_PATH% add .

echo 2. Committing changes...
set /p commit_msg="Update description (Enter to skip): "
if "%commit_msg%"=="" set commit_msg="Update portfolio content"
%GIT_PATH% commit -m "%commit_msg%"

echo 3. Pushing to GitHub...
%GIT_PATH% push origin main

echo.
echo ========================================
echo   DONE! Vercel will update your site
echo   in about 1 minute.
echo ========================================
pause
