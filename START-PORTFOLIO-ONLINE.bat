@echo off
title Chepuri Sohan - Portfolio Server & Mobile Link
echo ========================================================
echo Starting Chepuri Sohan Portfolio Server & Public Tunnel
echo ========================================================
echo.
echo Starting local web server on port 8443...
start /b pnpm preview
timeout /t 3 /nobreak >nul
echo.
echo Local Website: http://localhost:8443/
echo.
echo Starting Cloudflare Tunnel for Mobile & Internet Access...
echo ========================================================
cloudflared tunnel --url http://127.0.0.1:8443
pause
