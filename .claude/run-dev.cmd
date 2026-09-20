@echo off
set DISABLE_HMR=true
set LOCAL_DEV_LISTEN=1
"C:\Program Files\nodejs\node.exe" node_modules/tsx/dist/cli.mjs server.ts
