import React from 'react';
import { motion } from 'framer-motion';
import { textToBytes } from '../utils/encryption';

function ByteVisualization({ inputText, encryptedText, algorithm }) {
  const inputBytes = textToBytes(inputText.substring(0, 50));

  return (
    <motion.div
      className="byte-visualization"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="byte-section">
        <h3>Input Text Bytes</h3>
        <div className="byte-grid">
          {inputBytes.map((byte, index) => (
            <motion.div
              key={index}
              className="byte-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="byte-char">{byte.char}</div>
              <div className="byte-values">
                <div className="byte-value">
                  <span className="label">Dec:</span>
                  <span className="value">{byte.decimal}</span>
                </div>
                <div className="byte-value">
                  <span className="label">Hex:</span>
                  <span className="value">0x{byte.hex}</span>
                </div>
                <div className="byte-binary">{byte.binary}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {encryptedText && (
        <div className="byte-section">
          <h3>Byte Representation Comparison</h3>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Original</th>
                  <th>Decimal</th>
                  <th>Hex</th>
                  <th>Binary</th>
                </tr>
              </thead>
              <tbody>
                {inputBytes.slice(0, 16).map((byte, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td>{index}</td>
                    <td className="char-cell">{byte.char}</td>
                    <td>{byte.decimal}</td>
                    <td>0x{byte.hex}</td>
                    <td className="binary-cell">{byte.binary}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="byte-stats">
        <div className="stat-card">
          <div className="stat-value">{inputBytes.length}</div>
          <div className="stat-label">Total Bytes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{inputBytes.length * 8}</div>
          <div className="stat-label">Total Bits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.max(...inputBytes.map(b => b.decimal))}
          </div>
          <div className="stat-label">Max Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.min(...inputBytes.map(b => b.decimal))}
          </div>
          <div className="stat-label">Min Value</div>
        </div>
      </div>
    </motion.div>
  );
}

export default ByteVisualization;
