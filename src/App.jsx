import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, Shuffle, Code2, Binary, FileText, Download, Upload, Copy, Check, Settings, Info, Zap } from 'lucide-react';
import EncryptionPanel from './components/EncryptionPanel';
import VisualDisplay from './components/VisualDisplay';
import ByteVisualization from './components/ByteVisualization';
import StepByStep from './components/StepByStep';
import ComparisonView from './components/ComparisonView';
import './App.css';

const algorithms = [
  { id: 'aes', name: 'AES-256', icon: Lock, category: 'Modern', description: 'Advanced Encryption Standard' },
  { id: 'rc4', name: 'RC4', icon: Zap, category: 'Stream', description: 'Rivest Cipher 4 Stream Cipher' },
  { id: 'xor', name: 'XOR Cipher', icon: Binary, category: 'Simple', description: 'XOR One-Time Pad' },
  { id: 'caesar', name: 'Caesar', icon: Shuffle, category: 'Classical', description: 'Shift Cipher' },
  { id: 'substitution', name: 'Substitution', icon: Code2, category: 'Classical', description: 'Letter Replacement' },
  { id: 'transposition', name: 'Transposition', icon: Shuffle, category: 'Classical', description: 'Columnar Cipher' },
  { id: 'railfence', name: 'Rail Fence', icon: Shuffle, category: 'Classical', description: 'Zigzag Pattern' }
];

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('aes');
  const [inputText, setInputText] = useState('Hello, World!');
  const [key, setKey] = useState('mySecretKey123');
  const [encryptedData, setEncryptedData] = useState(null);
  const [mode, setMode] = useState('encrypt');
  const [viewMode, setViewMode] = useState('visual');
  const [autoEncrypt, setAutoEncrypt] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  useEffect(() => {
    if (autoEncrypt && inputText && key) {
      handleEncrypt();
    }
  }, [selectedAlgorithm, inputText, key, autoEncrypt]);

  const handleEncrypt = () => {
    const { aesEncrypt, rc4Encrypt, xorEncrypt, caesarEncrypt, substitutionEncrypt, transpositionEncrypt, railFenceEncrypt } = require('./utils/encryption');

    let result;
    switch (selectedAlgorithm) {
      case 'aes':
        result = aesEncrypt(inputText, key);
        break;
      case 'rc4':
        result = rc4Encrypt(inputText, key);
        break;
      case 'xor':
        result = xorEncrypt(inputText, key);
        break;
      case 'caesar':
        result = caesarEncrypt(inputText, parseInt(key) || 3);
        break;
      case 'substitution':
        result = substitutionEncrypt(inputText, key);
        break;
      case 'transposition':
        result = transpositionEncrypt(inputText, key);
        break;
      case 'railfence':
        result = railFenceEncrypt(inputText, parseInt(key) || 3);
        break;
      default:
        result = { result: '', steps: [], success: false };
    }

    setEncryptedData(result);
    setMode('encrypt');
  };

  const handleDecrypt = () => {
    if (!encryptedData || !encryptedData.result) return;

    const { aesDecrypt, rc4Decrypt, xorDecrypt, caesarDecrypt } = require('./utils/encryption');

    let result;
    switch (selectedAlgorithm) {
      case 'aes':
        result = aesDecrypt(encryptedData.result, key);
        break;
      case 'rc4':
        result = rc4Decrypt(encryptedData.result, key);
        break;
      case 'xor':
        result = xorDecrypt(encryptedData.result, key);
        break;
      case 'caesar':
        result = caesarDecrypt(encryptedData.result, parseInt(key) || 3);
        break;
      default:
        result = { result: 'Decryption not available for this cipher', success: false };
    }

    setEncryptedData({ ...encryptedData, decrypted: result.result });
    setMode('decrypt');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportData = () => {
    const data = {
      algorithm: selectedAlgorithm,
      input: inputText,
      key: key,
      encrypted: encryptedData?.result,
      steps: encryptedData?.steps,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encryption-${selectedAlgorithm}-${Date.now()}.json`;
    a.click();
  };

  const importFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInputText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Lock className="logo-icon" />
            <h1>Encryption Sandbox</h1>
          </div>
          <div className="header-actions">
            <button
              className={`icon-button ${showSettings ? 'active' : ''}`}
              onClick={() => setShowSettings(!showSettings)}
              title="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              className="icon-button"
              onClick={() => setCompareMode(!compareMode)}
              title="Compare Algorithms"
            >
              <Info size={20} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="settings-panel"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3>Settings</h3>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={autoEncrypt}
                  onChange={(e) => setAutoEncrypt(e.target.checked)}
                />
                Auto-encrypt on change
              </label>
            </div>
            <div className="setting-item">
              <label>
                Animation Speed: {animationSpeed}x
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.5"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="main-content">
        <div className="algorithm-selector">
          <h2>Select Algorithm</h2>
          <div className="algorithm-grid">
            {algorithms.map((algo) => {
              const Icon = algo.icon;
              return (
                <motion.button
                  key={algo.id}
                  className={`algorithm-card ${selectedAlgorithm === algo.id ? 'active' : ''}`}
                  onClick={() => setSelectedAlgorithm(algo.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="algorithm-icon" />
                  <div className="algorithm-info">
                    <h3>{algo.name}</h3>
                    <span className="category">{algo.category}</span>
                    <p>{algo.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {compareMode ? (
          <ComparisonView
            inputText={inputText}
            keyValue={key}
            algorithms={algorithms}
          />
        ) : (
          <>
            <div className="workspace">
              <EncryptionPanel
                inputText={inputText}
                setInputText={setInputText}
                keyValue={key}
                setKey={setKey}
                selectedAlgorithm={selectedAlgorithm}
                onEncrypt={handleEncrypt}
                onDecrypt={handleDecrypt}
                autoEncrypt={autoEncrypt}
                importFile={importFile}
              />

              <div className="output-section">
                <div className="output-header">
                  <div className="tabs">
                    <button
                      className={`tab ${viewMode === 'visual' ? 'active' : ''}`}
                      onClick={() => setViewMode('visual')}
                    >
                      Visual
                    </button>
                    <button
                      className={`tab ${viewMode === 'bytes' ? 'active' : ''}`}
                      onClick={() => setViewMode('bytes')}
                    >
                      Bytes
                    </button>
                    <button
                      className={`tab ${viewMode === 'steps' ? 'active' : ''}`}
                      onClick={() => setViewMode('steps')}
                    >
                      Steps
                    </button>
                  </div>
                  <div className="output-actions">
                    <button
                      className="icon-button"
                      onClick={() => copyToClipboard(encryptedData?.result || '')}
                      title="Copy result"
                      disabled={!encryptedData?.result}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    <button
                      className="icon-button"
                      onClick={exportData}
                      title="Export data"
                      disabled={!encryptedData}
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>

                <div className="output-content">
                  <AnimatePresence mode="wait">
                    {viewMode === 'visual' && (
                      <VisualDisplay
                        key="visual"
                        algorithm={selectedAlgorithm}
                        inputText={inputText}
                        encryptedData={encryptedData}
                        mode={mode}
                        animationSpeed={animationSpeed}
                      />
                    )}
                    {viewMode === 'bytes' && (
                      <ByteVisualization
                        key="bytes"
                        inputText={inputText}
                        encryptedText={encryptedData?.result || ''}
                        algorithm={selectedAlgorithm}
                      />
                    )}
                    {viewMode === 'steps' && (
                      <StepByStep
                        key="steps"
                        steps={encryptedData?.steps || []}
                        algorithm={selectedAlgorithm}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {encryptedData?.result && (
                  <div className="result-display">
                    <h3>{mode === 'encrypt' ? 'Encrypted Output' : 'Decrypted Output'}</h3>
                    <div className="result-box">
                      <code>{mode === 'encrypt' ? encryptedData.result : encryptedData.decrypted}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>Encryption Sandbox - Visual Cryptography Learning Tool</p>
        <p className="footer-note">⚠ For educational purposes only. Use production-grade libraries for real encryption.</p>
      </footer>
    </div>
  );
}

export default App;
