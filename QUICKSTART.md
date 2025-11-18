# 🚀 Quick Start Guide

Get Encryption Sandbox running on your Windows 11 PC in 5 minutes!

## ⚡ Super Quick Start

### 1. Install Node.js (5 minutes)
- Download from: https://nodejs.org/
- Run installer
- Check "Add to PATH"
- Restart computer

### 2. Run the App (2 minutes)
Open PowerShell in the project folder and run:
```bash
npm install
npm start
```

Done! The app will open automatically! 🎉

## 🎯 First Steps in the App

1. **Select an algorithm** - Click "AES-256" (default)
2. **Type a message** - Try "Hello World"
3. **See it encrypt** - Happens automatically!
4. **Click "Animate Process"** - Watch the visualization
5. **Try different algorithms** - Click any algorithm card

## 🏗️ Build Windows Installer

To create a distributable Windows app:

```bash
npm run package
```

Find your installer in: `dist-electron/Encryption Sandbox Setup 1.0.0.exe`

## 📚 Learn More

- **README.md** - Complete feature list and documentation
- **USER_GUIDE.md** - Detailed user guide with tutorials
- **WINDOWS_SETUP.md** - Comprehensive Windows setup and troubleshooting

## 🆘 Having Issues?

### Node.js not found?
1. Make sure you installed Node.js from https://nodejs.org/
2. Restart your computer
3. Open a NEW PowerShell window

### npm install fails?
1. Open PowerShell as Administrator (right-click → Run as Administrator)
2. Try: `npm install --legacy-peer-deps`

### App won't start?
1. Close all Node.js processes in Task Manager
2. Try: `npm start` again
3. Check if port 5173 is free

## 🎉 You're All Set!

Enjoy exploring cryptography with beautiful visualizations!

For detailed help, see:
- README.md (features & overview)
- USER_GUIDE.md (how to use)
- WINDOWS_SETUP.md (troubleshooting)
