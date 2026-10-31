@echo off
title MediScribe AI - Servidor Local + Enlace Celular HTTPS
echo ====================================================================
echo   1. Iniciando servidor local en http://localhost:8765
echo   2. Generando enlace HTTPS seguro para abrir en el CELULAR...
echo ====================================================================
start /B python -m http.server 8765 --bind 0.0.0.0
timeout /t 2 /nobreak >nul
start "" "http://localhost:8765"
echo.
echo Copia en tu celular el enlace https://xxxx.lhr.life que aparece abajo:
echo.
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:8765 nokey@localhost.run
