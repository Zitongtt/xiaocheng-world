@echo off
chcp 65001 > nul
title Push xiaocheng-world to GitHub
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-to-github.ps1"
