@echo off
chcp 65001 > nul
title Debug: why push failed
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0push-debug.ps1"
