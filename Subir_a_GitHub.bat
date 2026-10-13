@echo off
title Subir proyecto a GitHub
cd /d "%~dp0"

set /p REPO=Ingrese el nombre del repositorio en GitHub: 

git init
git add .
git commit -m "Primer commit"

git remote remove origin >nul 2>&1
git remote add origin https://github.com/giodev007/%REPO%.git

git branch -M main
git push -u origin main

echo.
echo ==========================================
echo Proyecto subido (si no hubo errores).
echo Presione una tecla para salir...
pause >nul
