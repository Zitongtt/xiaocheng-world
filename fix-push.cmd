@echo off
chcp 65001 > nul
title Fix push to GitHub
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0fix-push.ps1"
