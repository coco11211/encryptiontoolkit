# 📖 Encryption Sandbox - User Guide

Welcome to Encryption Sandbox! This guide will help you get the most out of this visual cryptography learning tool.

## 🎯 Getting Started

### First Launch

When you first open Encryption Sandbox, you'll see:
1. **Algorithm selector** at the top - 7 different encryption methods
2. **Input panel** on the left - where you enter text and keys
3. **Visualization panel** on the right - where the magic happens

### Your First Encryption

Let's encrypt something!

1. **Select AES** algorithm (it's usually selected by default)
2. **Type a message**: Try "Hello World"
3. **The key is already set**: You'll see "mySecretKey123"
4. **Watch it work**: The encryption happens automatically!
5. **Check the output**: Scroll down to see the encrypted result

Congratulations! You just encrypted your first message! 🎉

## 🔍 Exploring Visualizations

### Visual Mode (Default)

This is where you see the encryption process in action.

**For XOR Cipher:**
- See each character being XORed with the key
- Binary representations show exactly what's happening
- Watch bits flip in real-time!

**For Caesar Cipher:**
- See each letter shift by your chosen amount
- Position numbers show before and after
- Great for understanding the basics!

**For AES/RC4:**
- See the multi-step process
- Understand how modern encryption works in rounds
- Follow the data transformation

**Try it:**
1. Select "XOR Cipher"
2. Type: "SECRET"
3. Key: "KEY"
4. Click "Animate Process" button
5. Watch each character get encrypted!

### Bytes Mode

Want to see the raw data?

1. Click the "Bytes" tab
2. See your text as:
   - **Decimal** values (ASCII codes)
   - **Hexadecimal** (computer representation)
   - **Binary** (actual bits)

**Try it:**
- Type "ABC"
- See: A=65, B=66, C=67 in decimal
- See the binary representation: 01000001, 01000010, 01000011

### Steps Mode

Perfect for learning exactly what's happening!

1. Click the "Steps" tab
2. See each operation listed
3. Click any step to expand it
4. Read detailed information about what happened

**Try it:**
1. Use Caesar cipher with shift 3
2. Type "HELLO"
3. Go to Steps mode
4. Click on "Step 1" to see H→K transformation details

## 🎛️ Controls & Features

### Auto-Encryption

By default, encryption happens as you type!

- **To disable**: Click the gear icon ⚙️ → Uncheck "Auto-encrypt"
- **Manual mode**: You'll see Encrypt/Decrypt buttons appear
- **When to use**: When entering long text or experimenting

### Key Generation

Don't want to think of a key?

1. Click the **"Generate"** button next to the key field
2. A random, appropriate key is created for you
3. For Caesar/Rail Fence: Gets a random number
4. For others: Gets a random string

### Animation Speed

Too fast? Too slow?

1. Click the gear icon ⚙️
2. Adjust "Animation Speed" slider
3. Range: 0.5x (slow) to 2x (fast)
4. Perfect for presentations or learning

### File Import

Have a text file to encrypt?

1. Click **"Import File"** in the input section
2. Choose any .txt file
3. Contents load automatically
4. Now encrypt it!

### Export Results

Save your work!

1. Encrypt something
2. Click the download icon 💾
3. Saves as JSON with:
   - Algorithm used
   - Input text
   - Key
   - Encrypted output
   - All steps
   - Timestamp

### Copy Output

Need the encrypted text?

1. Encrypt your message
2. Click the copy icon 📋
3. Paste anywhere!

## 🔬 Algorithm Comparison

Want to see how algorithms stack up?

1. Click the info icon ℹ️ in the top-right
2. Enter some text and a key
3. **See all algorithms encrypt it simultaneously!**

You'll see:
- ⏱️ **Execution time** for each
- 🔐 **Security rating** (1-5 stars)
- 📏 **Output length**
- 📊 **Performance chart** at the bottom

**Try comparing:**
- Text: "The quick brown fox jumps over the lazy dog"
- Key: "SECRETKEY123"
- Notice how AES is both secure AND fast!
- See why classical ciphers have low security ratings

## 🎓 Learning Each Algorithm

### Start with Caesar

**Best for beginners!**
1. Select "Caesar" algorithm
2. Type: "HELLO"
3. Key: 3 (shift amount)
4. Result: "KHOOR"
5. **Learn**: Each letter moves 3 positions in alphabet

### Move to XOR

**See binary operations!**
1. Select "XOR Cipher"
2. Type: "HI"
3. Key: "AB"
4. Go to Visual mode
5. **Learn**: See exactly how XOR combines bits

### Try AES

**Modern encryption!**
1. Select "AES-256"
2. Type any message
3. Use a strong key
4. **Learn**: See the multi-round process
5. Notice the output is longer (includes metadata)

### Experiment with All

Try the same message with all algorithms:
- Message: "ATTACK AT DAWN"
- Key: "SECRET"
- Use comparison mode to see differences!

## 💡 Tips & Tricks

### For Learning
1. **Start simple**: Use short messages (3-5 characters)
2. **Use Steps mode**: Understand each operation
3. **Try the same key**: See how different algorithms behave
4. **Compare outputs**: Same input, different algorithms

### For Presentations
1. **Use Animation**: Show the process in action
2. **Adjust speed**: Slower for presentations
3. **Full screen**: F11 for immersive experience
4. **Start with visual**: Then show bytes/steps

### For Understanding Security
1. **Check ratings**: In comparison mode
2. **Try breaking classical ciphers**: Caesar with shift 1-25
3. **Key length matters**: Try XOR with short vs long keys
4. **Modern vs Classical**: Compare AES vs Caesar

## 🔐 Understanding Security Levels

### ⭐⭐⭐⭐⭐ Military Grade (AES)
- Used by governments and militaries
- Unbreakable with current technology
- Use for: Real encryption needs (with proper libraries)

### ⭐⭐⭐ Depends on Key (XOR)
- Secure IF key is:
  - Same length as message
  - Truly random
  - Used only once (one-time pad)
- Insecure otherwise!

### ⭐⭐ Deprecated/Weak (RC4, Transposition)
- Known vulnerabilities
- Can be broken with enough data
- Use for: Learning only

### ⭐ Easily Broken (Caesar, Substitution, Rail Fence)
- Can be broken in seconds/minutes
- Vulnerable to frequency analysis
- Use for: Learning and fun only

## 🎯 Common Tasks

### "I want to encrypt a secret message"
1. Use AES algorithm
2. Generate a random key
3. Share the key securely (in person, phone call)
4. Send the encrypted message
5. Recipient uses same key to decrypt

### "I want to learn how XOR works"
1. Select XOR Cipher
2. Use short text: "HI"
3. Use short key: "AB"
4. Go to Visual mode
5. Click "Animate Process"
6. Watch the binary operations!

### "I want to see which algorithm is fastest"
1. Click comparison mode (info icon)
2. Enter a long text (100+ characters)
3. Check the performance chart
4. See execution times in milliseconds

### "I want to break a Caesar cipher"
1. Select Caesar
2. Paste the encrypted message
3. Try keys 1-25 (there are only 25 possibilities!)
4. Look for readable output

## 🚨 Important Reminders

### ⚠️ This is for Learning!
- **DON'T** use this for real security needs
- **DON'T** trust classical ciphers for anything important
- **DO** use established libraries for real encryption
- **DO** understand the concepts before implementing

### ✅ Real-World Encryption
For actual encryption needs:
- **Node.js**: Use `crypto` module
- **Browser**: Use Web Crypto API
- **Python**: Use `cryptography` library
- **Never**: Roll your own crypto!

### 🎓 Educational Value
This tool helps you:
- ✅ Understand encryption concepts
- ✅ See how algorithms work visually
- ✅ Compare different approaches
- ✅ Learn security fundamentals
- ✅ Appreciate modern cryptography

## 🎨 Customization

### Dark Mode
The app uses dark mode by default (easier on the eyes for long learning sessions!)

### Window Size
- Resize freely
- Minimum width: 1200px
- Best at 1400x900 or larger
- Use full screen (F11) for best experience

## ⌨️ Keyboard Shortcuts

While the app doesn't have custom shortcuts, standard ones work:
- **Ctrl+A**: Select all text in input
- **Ctrl+C**: Copy selected text
- **Ctrl+V**: Paste text
- **Ctrl+Z**: Undo in text fields
- **F11**: Full screen
- **Alt+F4**: Close app

## 🎉 Fun Challenges

Try these to master the tool:

### Challenge 1: Break Caesar
- Encrypt "HELLO" with Caesar, shift 5
- Give the output to a friend
- Can they decrypt it without knowing the shift?

### Challenge 2: XOR Understanding
- Encrypt "AAA" with key "AAA"
- What do you notice about the output?
- Why does this happen? (Check binary view!)

### Challenge 3: Speed Test
- Use comparison mode
- Encrypt a 500-character text
- Which algorithm is fastest?

### Challenge 4: Security Analysis
- Encrypt same message with all algorithms
- Which outputs look most random?
- Which are easiest to recognize patterns in?

## 🆘 Need Help?

### App Acting Strange?
1. Close and reopen the app
2. Check if latest version
3. Clear any imported files
4. Try a different algorithm

### Want to Learn More?
Resources to continue learning:
- Khan Academy: Cryptography course
- Computerphile (YouTube): Encryption videos
- "The Code Book" by Simon Singh
- Online CTF (Capture The Flag) challenges

## 🎊 Have Fun!

Remember, cryptography is fascinating! Take your time, experiment, and enjoy learning how data security works. Every encryption you see on the internet uses concepts you're learning here!

Happy encrypting! 🔐✨
