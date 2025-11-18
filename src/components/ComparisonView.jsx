import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Key } from 'lucide-react';

function ComparisonView({ inputText, keyValue, algorithms }) {
  const [results, setResults] = useState([]);
  const [timings, setTimings] = useState([]);

  useEffect(() => {
    if (inputText && keyValue) {
      encryptAll();
    }
  }, [inputText, keyValue]);

  const encryptAll = () => {
    const { aesEncrypt, rc4Encrypt, xorEncrypt, caesarEncrypt, substitutionEncrypt, transpositionEncrypt, railFenceEncrypt } = require('../utils/encryption');

    const newResults = [];
    const newTimings = [];

    algorithms.forEach(algo => {
      const startTime = performance.now();
      let result;

      try {
        switch (algo.id) {
          case 'aes':
            result = aesEncrypt(inputText, keyValue);
            break;
          case 'rc4':
            result = rc4Encrypt(inputText, keyValue);
            break;
          case 'xor':
            result = xorEncrypt(inputText, keyValue);
            break;
          case 'caesar':
            result = caesarEncrypt(inputText, parseInt(keyValue) || 3);
            break;
          case 'substitution':
            result = substitutionEncrypt(inputText, keyValue);
            break;
          case 'transposition':
            result = transpositionEncrypt(inputText, keyValue);
            break;
          case 'railfence':
            result = railFenceEncrypt(inputText, parseInt(keyValue) || 3);
            break;
          default:
            result = { result: '', success: false };
        }

        const endTime = performance.now();
        const duration = (endTime - startTime).toFixed(3);

        newResults.push({
          algorithm: algo,
          encrypted: result.result,
          success: result.success,
          outputLength: result.result?.length || 0
        });

        newTimings.push({
          algorithm: algo.name,
          time: duration
        });
      } catch (error) {
        newResults.push({
          algorithm: algo,
          encrypted: 'Error',
          success: false,
          outputLength: 0
        });
        newTimings.push({
          algorithm: algo.name,
          time: '0'
        });
      }
    });

    setResults(newResults);
    setTimings(newTimings);
  };

  const getSecurityRating = (algoId) => {
    const ratings = {
      aes: { level: 5, label: 'Military Grade' },
      rc4: { level: 2, label: 'Deprecated' },
      xor: { level: 3, label: 'Depends on Key' },
      caesar: { level: 1, label: 'Easily Broken' },
      substitution: { level: 1, label: 'Weak' },
      transposition: { level: 2, label: 'Weak' },
      railfence: { level: 1, label: 'Very Weak' }
    };
    return ratings[algoId] || { level: 0, label: 'Unknown' };
  };

  return (
    <motion.div
      className="comparison-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>Algorithm Comparison</h2>

      <div className="comparison-grid">
        {results.map((result, index) => {
          const security = getSecurityRating(result.algorithm.id);
          const Icon = result.algorithm.icon;

          return (
            <motion.div
              key={result.algorithm.id}
              className="comparison-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="comparison-header">
                <Icon size={24} />
                <h3>{result.algorithm.name}</h3>
                <span className="category-badge">{result.algorithm.category}</span>
              </div>

              <div className="comparison-body">
                <div className="metric">
                  <Clock size={16} />
                  <div className="metric-content">
                    <span className="metric-label">Execution Time</span>
                    <span className="metric-value">
                      {timings.find(t => t.algorithm === result.algorithm.name)?.time || '0'} ms
                    </span>
                  </div>
                </div>

                <div className="metric">
                  <Key size={16} />
                  <div className="metric-content">
                    <span className="metric-label">Output Length</span>
                    <span className="metric-value">{result.outputLength} chars</span>
                  </div>
                </div>

                <div className="metric">
                  <Shield size={16} />
                  <div className="metric-content">
                    <span className="metric-label">Security Rating</span>
                    <div className="security-rating">
                      <div className="rating-bars">
                        {[1, 2, 3, 4, 5].map(level => (
                          <div
                            key={level}
                            className={`rating-bar ${level <= security.level ? 'active' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="rating-label">{security.label}</span>
                    </div>
                  </div>
                </div>

                <div className="encrypted-preview">
                  <strong>Encrypted Output:</strong>
                  <div className="preview-box">
                    <code>{result.encrypted?.substring(0, 100) || 'N/A'}</code>
                    {result.encrypted?.length > 100 && '...'}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="comparison-summary">
        <h3>Performance Summary</h3>
        <div className="timing-chart">
          {timings.sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).map((timing, index) => (
            <motion.div
              key={timing.algorithm}
              className="timing-bar"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <span className="timing-algorithm">{timing.algorithm}</span>
              <div className="timing-bar-fill" style={{ width: `${(parseFloat(timing.time) / Math.max(...timings.map(t => parseFloat(t.time)))) * 100}%` }} />
              <span className="timing-value">{timing.time} ms</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ComparisonView;
