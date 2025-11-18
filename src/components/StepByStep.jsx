import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

function StepByStep({ steps, algorithm }) {
  const [expandedStep, setExpandedStep] = useState(null);

  if (!steps || steps.length === 0) {
    return (
      <div className="step-empty">
        <p>No step-by-step data available for this algorithm.</p>
      </div>
    );
  }

  const toggleStep = (index) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  return (
    <motion.div
      className="step-by-step"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3>Step-by-Step Process</h3>
      <div className="steps-container">
        {algorithm === 'xor' && (
          <XORSteps steps={steps} expandedStep={expandedStep} toggleStep={toggleStep} />
        )}
        {algorithm === 'caesar' && (
          <CaesarSteps steps={steps} expandedStep={expandedStep} toggleStep={toggleStep} />
        )}
        {algorithm === 'substitution' && (
          <SubstitutionSteps steps={steps} expandedStep={expandedStep} toggleStep={toggleStep} />
        )}
        {(algorithm === 'aes' || algorithm === 'rc4') && (
          <ModernCipherSteps steps={steps} expandedStep={expandedStep} toggleStep={toggleStep} />
        )}
        {algorithm === 'railfence' && (
          <RailFenceSteps steps={steps} expandedStep={expandedStep} toggleStep={toggleStep} />
        )}
      </div>
    </motion.div>
  );
}

function XORSteps({ steps, expandedStep, toggleStep }) {
  const displaySteps = steps.slice(0, 20);

  return (
    <>
      {displaySteps.map((step, index) => (
        <motion.div
          key={index}
          className="step-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="step-header" onClick={() => toggleStep(index)}>
            <span className="step-number">Step {index + 1}</span>
            <span className="step-summary">
              '{step.textChar}' ⊕ '{step.keyChar}' = {step.xorResult}
            </span>
            {expandedStep === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                className="step-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Text Character:</strong> '{step.textChar}' (ASCII: {step.textCode})
                  </div>
                  <div className="detail-item">
                    <strong>Key Character:</strong> '{step.keyChar}' (ASCII: {step.keyCode})
                  </div>
                  <div className="detail-item">
                    <strong>Binary Operation:</strong>
                    <div className="binary-operation-detail">
                      <code>{step.binary.text}</code> (text)
                      <br />
                      <code>{step.binary.key}</code> (key)
                      <br />
                      <code>{step.binary.result}</code> (result)
                    </div>
                  </div>
                  <div className="detail-item">
                    <strong>Result:</strong> {step.xorResult} ('{step.resultChar}')
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}

function CaesarSteps({ steps, expandedStep, toggleStep }) {
  const displaySteps = steps.filter(s => !s.unchanged).slice(0, 20);

  return (
    <>
      {displaySteps.map((step, index) => (
        <motion.div
          key={index}
          className="step-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="step-header" onClick={() => toggleStep(index)}>
            <span className="step-number">Step {index + 1}</span>
            <span className="step-summary">
              '{step.original}' → '{step.result}' (shift: {step.shift})
            </span>
            {expandedStep === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                className="step-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Original Character:</strong> '{step.original}'
                  </div>
                  <div className="detail-item">
                    <strong>Position in Alphabet:</strong> {step.position}
                  </div>
                  <div className="detail-item">
                    <strong>Shift Amount:</strong> {step.shift}
                  </div>
                  <div className="detail-item">
                    <strong>New Position:</strong> {step.newPosition}
                  </div>
                  <div className="detail-item">
                    <strong>Result Character:</strong> '{step.result}'
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}

function SubstitutionSteps({ steps, expandedStep, toggleStep }) {
  const displaySteps = steps.filter(s => !s.unchanged).slice(0, 20);

  return (
    <>
      {displaySteps.map((step, index) => (
        <motion.div
          key={index}
          className="step-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="step-header" onClick={() => toggleStep(index)}>
            <span className="step-number">Step {index + 1}</span>
            <span className="step-summary">
              '{step.original}' → '{step.result}'
            </span>
            {expandedStep === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                className="step-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Original:</strong> '{step.original}'
                  </div>
                  <div className="detail-item">
                    <strong>Alphabet Position:</strong> {step.alphabetPosition}
                  </div>
                  <div className="detail-item">
                    <strong>Substitution:</strong> '{step.substitution}'
                  </div>
                  <div className="detail-item">
                    <strong>Result:</strong> '{step.result}'
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}

function ModernCipherSteps({ steps, expandedStep, toggleStep }) {
  return (
    <>
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="step-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="step-header" onClick={() => toggleStep(index)}>
            <span className="step-number">Step {index + 1}</span>
            <span className="step-summary">{step.step}</span>
            {expandedStep === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                className="step-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p className="step-description">{step.description}</p>
                {step.hex && (
                  <div className="hex-display">
                    <strong>Hex:</strong>
                    <code>{step.hex}</code>
                  </div>
                )}
                {step.data && (
                  <div className="data-display">
                    <strong>Data:</strong> {step.data}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}

function RailFenceSteps({ steps, expandedStep, toggleStep }) {
  const displaySteps = steps.slice(0, 20);

  return (
    <>
      {displaySteps.map((step, index) => (
        <motion.div
          key={index}
          className="step-item"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className="step-header" onClick={() => toggleStep(index)}>
            <span className="step-number">Step {index + 1}</span>
            <span className="step-summary">
              '{step.char}' placed on Rail {step.rail} (moving {step.direction})
            </span>
            {expandedStep === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <AnimatePresence>
            {expandedStep === index && (
              <motion.div
                className="step-details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Character:</strong> '{step.char}'
                  </div>
                  <div className="detail-item">
                    <strong>Position:</strong> {step.index}
                  </div>
                  <div className="detail-item">
                    <strong>Rail Number:</strong> {step.rail}
                  </div>
                  <div className="detail-item">
                    <strong>Direction:</strong> {step.direction}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
}

export default StepByStep;
