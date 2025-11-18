import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Key, Upload, Shuffle } from 'lucide-react';
import { generateRandomKey } from '../utils/encryption';

function EncryptionPanel({ inputText, setInputText, keyValue, setKey, selectedAlgorithm, onEncrypt, onDecrypt, autoEncrypt, importFile }) {
  const keyPlaceholder = selectedAlgorithm === 'caesar' || selectedAlgorithm === 'railfence'
    ? 'Enter shift number (e.g., 3)'
    : selectedAlgorithm === 'substitution'
    ? 'Enter substitution key'
    : selectedAlgorithm === 'transposition'
    ? 'Enter key (e.g., CIPHER)'
    : 'Enter encryption key';

  const handleGenerateKey = () => {
    if (selectedAlgorithm === 'caesar' || selectedAlgorithm === 'railfence') {
      setKey(Math.floor(Math.random() * 25 + 1).toString());
    } else if (selectedAlgorithm === 'transposition') {
      const words = ['CIPHER', 'SECURE', 'CRYPTO', 'SECRET', 'ENCODE'];
      setKey(words[Math.floor(Math.random() * words.length)]);
    } else {
      setKey(generateRandomKey(16));
    }
  };

  return (
    <div className="encryption-panel">
      <div className="input-section">
        <div className="section-header">
          <h3>Input Text</h3>
          <label className="file-input-label">
            <Upload size={16} />
            Import File
            <input
              type="file"
              onChange={importFile}
              accept=".txt"
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <textarea
          className="input-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to encrypt..."
          rows={6}
        />
      </div>

      <div className="key-section">
        <div className="section-header">
          <h3>
            <Key size={18} />
            Encryption Key
          </h3>
          <button
            className="generate-key-btn"
            onClick={handleGenerateKey}
            title="Generate random key"
          >
            <Shuffle size={16} />
            Generate
          </button>
        </div>
        <input
          type="text"
          className="key-input"
          value={keyValue}
          onChange={(e) => setKey(e.target.value)}
          placeholder={keyPlaceholder}
        />
      </div>

      {!autoEncrypt && (
        <div className="action-buttons">
          <motion.button
            className="action-button encrypt"
            onClick={onEncrypt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Lock size={18} />
            Encrypt
          </motion.button>
          <motion.button
            className="action-button decrypt"
            onClick={onDecrypt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Unlock size={18} />
            Decrypt
          </motion.button>
        </div>
      )}

      <div className="info-panel">
        <h4>Algorithm Info</h4>
        {selectedAlgorithm === 'aes' && (
          <p>AES (Advanced Encryption Standard) is a symmetric block cipher using 128-bit blocks with 128, 192, or 256-bit keys. It's the gold standard for encryption.</p>
        )}
        {selectedAlgorithm === 'rc4' && (
          <p>RC4 is a stream cipher that generates a pseudo-random stream of bits (keystream) which is XORed with plaintext. Fast but has known vulnerabilities.</p>
        )}
        {selectedAlgorithm === 'xor' && (
          <p>XOR cipher uses the exclusive OR operation. Each character is XORed with the corresponding key character. When key length equals message length, it's a one-time pad.</p>
        )}
        {selectedAlgorithm === 'caesar' && (
          <p>Caesar cipher shifts each letter by a fixed number of positions in the alphabet. Simple but easily broken with frequency analysis.</p>
        )}
        {selectedAlgorithm === 'substitution' && (
          <p>Substitution cipher replaces each letter with another letter according to a fixed system. More secure than Caesar but still vulnerable to frequency analysis.</p>
        )}
        {selectedAlgorithm === 'transposition' && (
          <p>Transposition cipher rearranges the positions of characters. The columnar transposition writes text in rows and reads in columns based on key order.</p>
        )}
        {selectedAlgorithm === 'railfence' && (
          <p>Rail Fence cipher writes the message in a zigzag pattern across multiple rails, then reads off each rail sequentially.</p>
        )}
      </div>
    </div>
  );
}

export default EncryptionPanel;
