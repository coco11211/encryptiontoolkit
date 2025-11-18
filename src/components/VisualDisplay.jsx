import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

function VisualDisplay({ algorithm, inputText, encryptedData, mode, animationSpeed = 1 }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setActiveStep(0);
  }, [algorithm, inputText, encryptedData]);

  const startAnimation = () => {
    setIsAnimating(true);
    setActiveStep(0);

    const steps = encryptedData?.steps?.length || 5;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      if (current >= steps) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setActiveStep(current);
      }
    }, 1000 / animationSpeed);

    return () => clearInterval(interval);
  };

  if (!encryptedData) {
    return (
      <motion.div
        className="visual-empty"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>Enter text and key to see encryption visualization</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="visual-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="visual-header">
        <h3>Encryption Process Visualization</h3>
        <button
          className="animate-button"
          onClick={startAnimation}
          disabled={isAnimating}
        >
          <Zap size={16} />
          {isAnimating ? 'Animating...' : 'Animate Process'}
        </button>
      </div>

      {algorithm === 'xor' && (
        <XORVisualization
          steps={encryptedData.steps}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}

      {algorithm === 'caesar' && (
        <CaesarVisualization
          steps={encryptedData.steps}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}

      {(algorithm === 'aes' || algorithm === 'rc4') && (
        <ModernCipherVisualization
          algorithm={algorithm}
          steps={encryptedData.steps}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}

      {algorithm === 'railfence' && (
        <RailFenceVisualization
          steps={encryptedData.steps}
          fence={encryptedData.fence}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}

      {algorithm === 'transposition' && (
        <TranspositionVisualization
          steps={encryptedData.steps}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}

      {algorithm === 'substitution' && (
        <SubstitutionVisualization
          steps={encryptedData.steps}
          activeStep={activeStep}
          isAnimating={isAnimating}
        />
      )}
    </motion.div>
  );
}

function XORVisualization({ steps, activeStep, isAnimating }) {
  const displaySteps = steps.slice(0, Math.min(10, steps.length));

  return (
    <div className="xor-visual">
      {displaySteps.map((step, index) => (
        <motion.div
          key={index}
          className={`xor-step ${isAnimating && index === activeStep ? 'active' : ''}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: index <= activeStep ? 1 : 0.3, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="binary-operation">
            <div className="binary-row">
              <span className="label">Text:</span>
              <span className="binary">{step.binary.text}</span>
              <span className="char">'{step.textChar}' ({step.textCode})</span>
            </div>
            <div className="operator">⊕ XOR</div>
            <div className="binary-row">
              <span className="label">Key:</span>
              <span className="binary">{step.binary.key}</span>
              <span className="char">'{step.keyChar}' ({step.keyCode})</span>
            </div>
            <ArrowRight className="arrow-icon" />
            <div className="binary-row result">
              <span className="label">Result:</span>
              <span className="binary">{step.binary.result}</span>
              <span className="char">({step.xorResult})</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CaesarVisualization({ steps, activeStep, isAnimating }) {
  const displaySteps = steps.filter(s => !s.unchanged).slice(0, 10);

  return (
    <div className="caesar-visual">
      <div className="alphabet-wheel">
        {displaySteps.map((step, index) => (
          <motion.div
            key={index}
            className={`caesar-step ${isAnimating && index === activeStep ? 'active' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index <= activeStep ? 1 : 0.3,
              scale: index === activeStep && isAnimating ? 1.1 : 1
            }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="shift-display">
              <span className="original">{step.original}</span>
              <div className="shift-arrow">
                <span className="shift-amount">+{step.shift}</span>
                <ArrowRight size={20} />
              </div>
              <span className="result">{step.result}</span>
            </div>
            <div className="position-info">
              Position {step.position} → {step.newPosition}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ModernCipherVisualization({ algorithm, steps, activeStep, isAnimating }) {
  return (
    <div className="modern-cipher-visual">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className={`cipher-step ${isAnimating && index === activeStep ? 'active' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index <= activeStep ? 1 : 0.3,
            y: 0
          }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-content">
            <h4>{step.step}</h4>
            <p className="step-description">{step.description}</p>
            {step.hex && (
              <div className="hex-display">
                <code>{step.hex}</code>
              </div>
            )}
            {step.data && (
              <div className="data-display">{step.data}</div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function RailFenceVisualization({ steps, fence, activeStep, isAnimating }) {
  if (!fence) return <div>No visualization available</div>;

  return (
    <div className="railfence-visual">
      <div className="rails">
        {fence.map((rail, railIndex) => (
          <div key={railIndex} className="rail">
            <span className="rail-label">Rail {railIndex + 1}:</span>
            <div className="rail-content">
              {rail.map((item, charIndex) => (
                <motion.span
                  key={charIndex}
                  className={`rail-char ${isAnimating && item.position === activeStep ? 'active' : ''}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: item.position <= activeStep ? 1 : 0.3,
                    scale: 1
                  }}
                  transition={{ delay: item.position * 0.05 }}
                >
                  {item.char}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranspositionVisualization({ steps, activeStep, isAnimating }) {
  if (!steps || steps.length === 0) return <div>No visualization available</div>;

  const { grid, keyOrder, numRows, keyLength } = steps[0];

  return (
    <div className="transposition-visual">
      <div className="transposition-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="trans-row">
            {row.map((char, colIndex) => {
              const readOrder = keyOrder.indexOf(colIndex);
              return (
                <motion.div
                  key={colIndex}
                  className={`trans-cell ${isAnimating && readOrder === activeStep ? 'active' : ''}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: readOrder <= activeStep ? 1 : 0.5
                  }}
                >
                  <span className="cell-char">{char}</span>
                  <span className="cell-order">{readOrder + 1}</span>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function SubstitutionVisualization({ steps, activeStep, isAnimating }) {
  const displaySteps = steps.filter(s => !s.unchanged).slice(0, 12);

  return (
    <div className="substitution-visual">
      <div className="substitution-grid">
        {displaySteps.map((step, index) => (
          <motion.div
            key={index}
            className={`sub-step ${isAnimating && index === activeStep ? 'active' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index <= activeStep ? 1 : 0.3,
              scale: index === activeStep && isAnimating ? 1.1 : 1
            }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="sub-original">{step.original}</div>
            <ArrowRight size={16} />
            <div className="sub-result">{step.result}</div>
            <div className="sub-position">Pos: {step.alphabetPosition}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default VisualDisplay;
