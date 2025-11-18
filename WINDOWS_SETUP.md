# 🪟 Windows 11 Setup Guide

Complete guide for running Encryption Sandbox on Windows 11.

## 📋 Prerequisites

### 1. Install Node.js

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (currently 18.x or 20.x)
3. Run the installer
4. **Important**: Check "Add to PATH" during installation
5. Restart your computer after installation

**Verify Installation:**
Open Command Prompt or PowerShell and type:
```bash
node --version
npm --version
```
You should see version numbers.

### 2. Install Git (Optional but Recommended)

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. Use default settings
4. Restart your computer

## 🚀 Installation Methods

### Method 1: Using Git (Recommended)

1. Open Command Prompt or PowerShell
2. Navigate to where you want the project:
   ```bash
   cd C:\Users\YourName\Documents
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/encryption-sandbox.git
   cd encryption-sandbox
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

### Method 2: Download ZIP

1. Download the project as ZIP
2. Extract to a folder (e.g., `C:\Users\YourName\Documents\encryption-sandbox`)
3. Open Command Prompt in that folder:
   - Right-click the folder while holding Shift
   - Select "Open PowerShell window here" or "Open Command Prompt here"
4. Install dependencies:
   ```bash
   npm install
   ```

## ▶️ Running the Application

### Development Mode (Quick Test)

```bash
npm start
```

This will:
1. Start the development server
2. Open the app automatically
3. Enable hot-reload (changes reflect immediately)
4. Show developer tools for debugging

**First time might take 30-60 seconds to start!**

### Just the Web Version (Faster for testing)

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

## 📦 Building for Windows

### Create Installer

To create a Windows installer (.exe):

```bash
npm run package
```

**This will:**
1. Build the application
2. Package it with Electron
3. Create an NSIS installer
4. Output to `dist-electron` folder

**Find your installer:**
```
dist-electron/
└── Encryption Sandbox Setup 1.0.0.exe
```

**Installation Size:**
- Download: ~80-100MB
- Installed: ~200-250MB

### Create Portable Version

For a portable version without installer:

```bash
npm run package:dir
```

**Find portable version:**
```
dist-electron/win-unpacked/
└── Encryption Sandbox.exe
```

Just copy the entire `win-unpacked` folder to run anywhere!

## 🐛 Troubleshooting

### "node is not recognized"

**Problem:** Node.js not in PATH

**Solution:**
1. Reinstall Node.js
2. Make sure "Add to PATH" is checked
3. Restart computer
4. Open NEW Command Prompt window

### "npm install" fails

**Problem:** Network or permissions issue

**Solution:**
1. Run Command Prompt as Administrator
2. Try again: `npm install`
3. If still fails: `npm install --legacy-peer-deps`
4. Check antivirus isn't blocking

### Build fails with "electron-builder error"

**Problem:** Windows Defender or permissions

**Solution:**
1. Add project folder to Windows Defender exclusions:
   - Open Windows Security
   - Virus & threat protection
   - Manage settings
   - Add exclusion
   - Select your project folder
2. Run Command Prompt as Administrator
3. Try build again

### Port 5173 already in use

**Problem:** Another process using the port

**Solution:**
1. Close any running instances
2. Open Task Manager
3. End any Node.js processes
4. Try again

### App opens then closes immediately

**Problem:** Missing dependencies

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json` file
3. Run `npm install` again
4. Try `npm start` again

### "Cannot find module" errors

**Problem:** Incomplete installation

**Solution:**
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Visual glitches or slow performance

**Problem:** Graphics drivers or hardware acceleration

**Solution:**
1. Update your graphics drivers
2. If still slow, edit `electron/main.js`:
   ```javascript
   webPreferences: {
     // ... existing settings
     disableHardwareAcceleration: true
   }
   ```

## 🎯 Performance Tips

### For Better Performance:

1. **Close other applications** while running
2. **Use SSD** if possible (faster load times)
3. **Update graphics drivers**
4. **Reduce animation speed** in app settings

### System Requirements:

**Minimum:**
- Windows 11 (64-bit)
- 4GB RAM
- 500MB free disk space
- Dual-core processor

**Recommended:**
- Windows 11 (64-bit)
- 8GB RAM
- 1GB free disk space
- Quad-core processor
- Dedicated graphics card

## 📁 File Structure on Windows

After installation:
```
C:\Users\YourName\Documents\encryption-sandbox\
├── node_modules\        (dependencies - large folder)
├── electron\            (Electron main process)
├── src\                 (React source code)
├── public\              (static files)
├── dist\                (web build output)
├── dist-electron\       (Windows installer)
├── package.json
└── README.md
```

## 🔒 Security Notes for Windows

### Windows Defender

Windows Defender might flag the app during build:
- This is **normal** for Electron apps
- The app is **safe** and open-source
- Add exception if needed

### Firewall

First run might show Windows Firewall prompt:
- Click "Allow access"
- This is for the development server only
- No internet connection needed for the app itself

### Antivirus

Some antivirus software might slow down npm install:
- Temporarily disable real-time scanning
- Or add project folder to exclusions

## 🎓 What Gets Installed?

### During `npm install`:
- React (UI framework)
- Electron (desktop wrapper)
- Vite (build tool)
- Various dependencies
- **Total size:** ~300-400MB

### During `npm run package`:
- Electron binaries
- Your application code
- Node.js runtime
- **Total installer:** ~80-100MB
- **Installed app:** ~200-250MB

## 📤 Distributing Your Build

### Share with Others:

**Option 1: Installer**
```
dist-electron/Encryption Sandbox Setup 1.0.0.exe
```
- Send this file to anyone
- They run it to install
- Creates Start Menu shortcuts
- Can uninstall normally

**Option 2: Portable**
```
dist-electron/win-unpacked/
```
- Zip this entire folder
- Send to anyone
- They extract and run `Encryption Sandbox.exe`
- No installation needed

### Code Signing (Optional)

For production distribution:
1. Get a code signing certificate
2. Configure in `package.json`:
   ```json
   "win": {
     "certificateFile": "path/to/cert.pfx",
     "certificatePassword": "password"
   }
   ```
3. Build: `npm run package`

Without signing, Windows will show "Unknown Publisher" warning.

## 🔄 Updating

### Get Latest Code:

**With Git:**
```bash
git pull
npm install
npm start
```

**Without Git:**
1. Download new ZIP
2. Extract to new folder
3. Copy your files if needed
4. Run `npm install`

## 💾 Backup Your Work

Important folders to backup:
- Your encrypted files/exports
- Any custom modifications
- `package.json` if you changed it

**Don't need to backup:**
- `node_modules` (can reinstall)
- `dist` folders (can rebuild)

## 🎉 Ready to Go!

You should now have:
- ✅ Node.js installed
- ✅ Project dependencies installed
- ✅ App running in development mode
- ✅ Or installer built for distribution

## 📞 Getting Help

If you still have issues:

1. **Check the error message** carefully
2. **Search for the error** online
3. **Make sure all prerequisites** are installed
4. **Try running as Administrator**
5. **Check antivirus/firewall** settings

Common search terms:
- "npm install fails Windows"
- "electron-builder Windows 11"
- "Node.js PATH Windows"

---

Enjoy your Encryption Sandbox on Windows 11! 🔐✨
