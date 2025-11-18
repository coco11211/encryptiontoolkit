# 🔐 Encryption Sandbox

A stunning, feature-rich desktop application for visualizing and understanding encryption algorithms. Built with Electron, React, and modern web technologies, featuring a beautiful dark mode interface with Figma-level UX/UI design.

![Encryption Sandbox](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Windows%2011-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔒 Multiple Encryption Algorithms
- **AES-256** - Military-grade encryption standard
- **RC4** - Stream cipher with visual keystream generation
- **XOR Cipher** - One-time pad with binary visualization
- **Caesar Cipher** - Classic shift cipher with alphabet wheel
- **Substitution Cipher** - Letter replacement visualization
- **Transposition Cipher** - Columnar permutation
- **Rail Fence Cipher** - Zigzag pattern encryption

### 🎨 Stunning Visual Features
- **Real-time Visualization** - Watch encryption happen step-by-step
- **Binary Operations** - See XOR operations at the bit level
- **Animated Processes** - Beautiful animations showing data transformation
- **Byte View** - Inspect data at byte level with hex and binary representations
- **Step-by-Step Mode** - Detailed breakdown of each encryption step
- **Comparison Mode** - Compare all algorithms side-by-side

### 💎 Advanced Functionality
- **Auto-encryption** - Real-time encryption as you type
- **File Import** - Encrypt text files directly
- **Export Results** - Save encryption data as JSON
- **Random Key Generation** - Cryptographically appropriate key generation
- **Performance Metrics** - See execution time for each algorithm
- **Security Ratings** - Visual security level indicators
- **Dark Mode UI** - Beautiful, easy-on-the-eyes interface

## 🚀 Quick Start for Windows 11

### Prerequisites
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional) - [Download here](https://git-scm.com/)

### Installation

1. **Download/Clone the Project**
   ```bash
   git clone https://github.com/yourusername/encryption-sandbox.git
   cd encryption-sandbox
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm start
   ```
   The app will automatically open in a new window!

### 📦 Building for Windows 11

To create a standalone Windows installer:

```bash
# Build the application
npm run package
```

The installer will be created in the `dist-electron` folder:
- `Encryption Sandbox Setup X.X.X.exe` - Full installer
- You can distribute this to other Windows 11 machines!

## 🎯 How to Use

### Basic Encryption

1. **Select an Algorithm** - Click on any algorithm card (AES, RC4, XOR, etc.)
2. **Enter Your Text** - Type or paste text in the input area
3. **Set a Key** - Enter a encryption key or click "Generate" for random key
4. **Watch the Magic** - Encryption happens automatically!

### Visual Modes

#### 🎬 Visual Mode
- Shows animated encryption process
- Click "Animate Process" to see step-by-step transformation
- Different visualization for each algorithm type

#### 🔢 Bytes Mode
- View text as decimal, hexadecimal, and binary
- See byte-by-byte comparison
- Statistics about your data

#### 📋 Steps Mode
- Detailed step-by-step breakdown
- Click any step to expand details
- Perfect for learning how algorithms work

### Advanced Features

#### Compare Algorithms
1. Click the info icon (ℹ️) in the header
2. See all algorithms encrypt your text simultaneously
3. Compare execution times and security ratings
4. View encrypted outputs side-by-side

#### Export Your Work
1. Encrypt some text
2. Click the download icon
3. Save as JSON with full encryption details
4. Import later to continue your work

#### Import Files
1. Click "Import File" button
2. Select a .txt file
3. File contents will be loaded for encryption

## 🎨 Algorithm Details

### AES (Advanced Encryption Standard)
- **Security**: ⭐⭐⭐⭐⭐ Military Grade
- **Speed**: Fast
- **Use Case**: Secure file encryption, HTTPS, VPNs
- **Visualization**: Shows round-by-round transformation

### RC4 (Rivest Cipher 4)
- **Security**: ⭐⭐ Deprecated
- **Speed**: Very Fast
- **Use Case**: Historical (WEP, early TLS)
- **Visualization**: KSA and PRGA process visualization

### XOR Cipher
- **Security**: ⭐⭐⭐ Depends on Key
- **Speed**: Extremely Fast
- **Use Case**: One-time pad (when done correctly)
- **Visualization**: Binary XOR operations with detailed breakdown

### Caesar Cipher
- **Security**: ⭐ Easily Broken
- **Speed**: Instant
- **Use Case**: Learning, simple obfuscation
- **Visualization**: Alphabet shift wheel

### Substitution Cipher
- **Security**: ⭐ Weak
- **Speed**: Fast
- **Use Case**: Historical, puzzles
- **Visualization**: Letter-by-letter replacement mapping

### Transposition Cipher
- **Security**: ⭐⭐ Weak
- **Speed**: Fast
- **Use Case**: Historical military communications
- **Visualization**: Columnar grid with reading order

### Rail Fence Cipher
- **Security**: ⭐ Very Weak
- **Speed**: Fast
- **Use Case**: Historical, educational
- **Visualization**: Zigzag rail pattern

## ⚙️ Settings

Access settings by clicking the gear icon (⚙️):

- **Auto-encrypt on change** - Toggle automatic encryption
- **Animation Speed** - Adjust visualization speed (0.5x to 2x)

## 🔧 Development

### Project Structure
```
encryption-sandbox/
├── electron/           # Electron main process
│   └── main.js
├── src/
│   ├── components/    # React components
│   │   ├── ByteVisualization.jsx
│   │   ├── ComparisonView.jsx
│   │   ├── EncryptionPanel.jsx
│   │   ├── StepByStep.jsx
│   │   └── VisualDisplay.jsx
│   ├── utils/         # Encryption utilities
│   │   └── encryption.js
│   ├── App.jsx        # Main app component
│   ├── App.css        # Styles
│   └── main.jsx       # React entry point
├── public/            # Static assets
├── package.json
└── vite.config.js
```

### Available Scripts

```bash
# Start development server
npm run dev

# Start Electron app (dev mode)
npm start

# Build for production
npm run build

# Package as Windows installer
npm run package

# Package without installer (portable)
npm run package:dir
```

### Tech Stack
- **Electron** - Desktop application framework
- **React** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **CryptoJS** - Encryption implementations
- **Lucide React** - Beautiful icons

## 🎓 Educational Notes

This application is designed for **educational purposes** to help users understand how different encryption algorithms work.

### Security Warnings
- ⚠️ This is a learning tool, not production encryption software
- ⚠️ For real-world encryption, use established libraries like:
  - Node.js: `crypto` module
  - Browser: Web Crypto API
  - Python: `cryptography` library
- ⚠️ Never implement your own cryptography for production use
- ⚠️ Classical ciphers (Caesar, Substitution, etc.) are NOT secure

### Best Practices Shown
- ✅ Modern algorithms (AES) use multiple rounds
- ✅ Key size matters for security
- ✅ Stream ciphers need proper key management
- ✅ Understanding the underlying mathematics helps prevent mistakes

## 🐛 Troubleshooting

### App won't start?
1. Make sure Node.js is installed: `node --version`
2. Delete `node_modules` and run `npm install` again
3. Check if port 5173 is available

### Build fails?
1. Run `npm run build` first to ensure Vite build works
2. Check Windows Defender isn't blocking electron-builder
3. Make sure you have write permissions to the folder

### Visual artifacts or performance issues?
1. Update your graphics drivers
2. Disable hardware acceleration in Electron if needed
3. Reduce animation speed in settings

## 📝 License

MIT License - feel free to use this for learning and education!

## 🤝 Contributing

This is an educational project! Feel free to:
- Add new encryption algorithms
- Improve visualizations
- Enhance the UI/UX
- Fix bugs or add features

## 🌟 Credits

Built with love using:
- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [CryptoJS](https://cryptojs.gitbook.io/)
- [Lucide Icons](https://lucide.dev/)

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Remember**: This is a tool for learning. For real encryption needs, always use well-tested, industry-standard libraries! 🔒

Enjoy exploring the fascinating world of cryptography! 🎉
