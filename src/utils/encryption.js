import CryptoJS from 'crypto-js';

// AES Encryption
export const aesEncrypt = (text, key) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(text, key);
    return {
      result: encrypted.toString(),
      steps: generateAESSteps(text, key),
      success: true
    };
  } catch (error) {
    return { result: '', steps: [], success: false, error: error.message };
  }
};

export const aesDecrypt = (ciphertext, key) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
    return {
      result: decrypted.toString(CryptoJS.enc.Utf8),
      success: true
    };
  } catch (error) {
    return { result: '', success: false, error: error.message };
  }
};

// RC4 Encryption
export const rc4Encrypt = (text, key) => {
  try {
    const encrypted = CryptoJS.RC4.encrypt(text, key);
    return {
      result: encrypted.toString(),
      steps: generateRC4Steps(text, key),
      success: true
    };
  } catch (error) {
    return { result: '', steps: [], success: false, error: error.message };
  }
};

export const rc4Decrypt = (ciphertext, key) => {
  try {
    const decrypted = CryptoJS.RC4.decrypt(ciphertext, key);
    return {
      result: decrypted.toString(CryptoJS.enc.Utf8),
      success: true
    };
  } catch (error) {
    return { result: '', success: false, error: error.message };
  }
};

// XOR Cipher
export const xorEncrypt = (text, key) => {
  if (!key || key.length === 0) {
    return { result: '', steps: [], success: false, error: 'Key required' };
  }

  let result = '';
  const steps = [];

  for (let i = 0; i < text.length; i++) {
    const textChar = text.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const xorResult = textChar ^ keyChar;
    result += String.fromCharCode(xorResult);

    steps.push({
      index: i,
      textChar: text[i],
      textCode: textChar,
      keyChar: key[i % key.length],
      keyCode: keyChar,
      xorResult: xorResult,
      resultChar: String.fromCharCode(xorResult),
      binary: {
        text: textChar.toString(2).padStart(8, '0'),
        key: keyChar.toString(2).padStart(8, '0'),
        result: xorResult.toString(2).padStart(8, '0')
      }
    });
  }

  return {
    result: btoa(result),
    steps: steps,
    success: true
  };
};

export const xorDecrypt = (ciphertext, key) => {
  try {
    const decoded = atob(ciphertext);
    let result = '';

    for (let i = 0; i < decoded.length; i++) {
      const cipherChar = decoded.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      result += String.fromCharCode(cipherChar ^ keyChar);
    }

    return { result: result, success: true };
  } catch (error) {
    return { result: '', success: false, error: error.message };
  }
};

// Caesar Cipher (Permutation)
export const caesarEncrypt = (text, shift) => {
  shift = parseInt(shift) || 0;
  let result = '';
  const steps = [];

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char.match(/[a-z]/i)) {
      const code = text.charCodeAt(i);
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      const shifted = ((code - base + shift) % 26 + 26) % 26;
      const newChar = String.fromCharCode(base + shifted);

      steps.push({
        index: i,
        original: char,
        shift: shift,
        result: newChar,
        position: code - base,
        newPosition: shifted
      });

      result += newChar;
    } else {
      result += char;
      steps.push({
        index: i,
        original: char,
        shift: 0,
        result: char,
        unchanged: true
      });
    }
  }

  return { result, steps, success: true };
};

export const caesarDecrypt = (text, shift) => {
  return caesarEncrypt(text, -shift);
};

// Substitution Cipher (Custom Permutation)
export const substitutionEncrypt = (text, key) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const substitutionKey = key.toUpperCase().padEnd(26, alphabet);

  let result = '';
  const steps = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const upperChar = char.toUpperCase();

    if (alphabet.includes(upperChar)) {
      const index = alphabet.indexOf(upperChar);
      const newChar = substitutionKey[index];
      const resultChar = char === char.toLowerCase() ? newChar.toLowerCase() : newChar;

      steps.push({
        index: i,
        original: char,
        alphabetPosition: index,
        substitution: newChar,
        result: resultChar
      });

      result += resultChar;
    } else {
      result += char;
      steps.push({
        index: i,
        original: char,
        result: char,
        unchanged: true
      });
    }
  }

  return { result, steps, success: true };
};

// Transposition Cipher (Columnar)
export const transpositionEncrypt = (text, key) => {
  const keyLength = key.length;
  const numRows = Math.ceil(text.length / keyLength);
  const grid = [];

  // Create grid
  for (let i = 0; i < numRows; i++) {
    grid[i] = [];
    for (let j = 0; j < keyLength; j++) {
      const index = i * keyLength + j;
      grid[i][j] = index < text.length ? text[index] : ' ';
    }
  }

  // Sort columns by key
  const keyOrder = key.split('').map((char, i) => ({ char, index: i }))
    .sort((a, b) => a.char.localeCompare(b.char))
    .map(item => item.index);

  // Read columns in order
  let result = '';
  keyOrder.forEach(col => {
    for (let row = 0; row < numRows; row++) {
      result += grid[row][col];
    }
  });

  return {
    result: result.trim(),
    steps: [{ grid, keyOrder, numRows, keyLength }],
    success: true
  };
};

// Rail Fence Cipher
export const railFenceEncrypt = (text, rails) => {
  rails = parseInt(rails) || 3;
  if (rails < 2) rails = 2;

  const fence = Array(rails).fill(null).map(() => []);
  let rail = 0;
  let direction = 1;

  const steps = [];

  for (let i = 0; i < text.length; i++) {
    fence[rail].push({ char: text[i], position: i });
    steps.push({
      index: i,
      char: text[i],
      rail: rail,
      direction: direction > 0 ? 'down' : 'up'
    });

    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  const result = fence.flat().map(item => item.char).join('');

  return {
    result,
    steps,
    fence,
    success: true
  };
};

// Helper functions for visualization
function generateAESSteps(text, key) {
  const steps = [];
  const bytes = CryptoJS.enc.Utf8.parse(text);
  const keyBytes = CryptoJS.enc.Utf8.parse(key);

  steps.push({
    step: 'Input Text',
    description: 'Original plaintext',
    data: text,
    hex: bytes.toString(CryptoJS.enc.Hex)
  });

  steps.push({
    step: 'Key Expansion',
    description: 'AES key schedule generation',
    data: key,
    hex: keyBytes.toString(CryptoJS.enc.Hex)
  });

  steps.push({
    step: 'Initial Round',
    description: 'AddRoundKey operation',
    data: 'XOR with first round key'
  });

  steps.push({
    step: 'Main Rounds',
    description: 'SubBytes → ShiftRows → MixColumns → AddRoundKey',
    data: '10/12/14 rounds based on key size'
  });

  steps.push({
    step: 'Final Round',
    description: 'SubBytes → ShiftRows → AddRoundKey',
    data: 'No MixColumns in final round'
  });

  return steps;
}

function generateRC4Steps(text, key) {
  const steps = [];

  steps.push({
    step: 'Key Scheduling',
    description: 'Initialize S-box with key',
    data: 'KSA: Permutation of 0-255'
  });

  steps.push({
    step: 'Pseudo-random Generation',
    description: 'PRGA: Generate keystream',
    data: 'Swap and output keystream bytes'
  });

  steps.push({
    step: 'XOR Operation',
    description: 'Plaintext ⊕ Keystream',
    data: 'Each byte XORed with keystream'
  });

  return steps;
}

// Byte array visualization
export const textToBytes = (text) => {
  const bytes = [];
  for (let i = 0; i < text.length; i++) {
    bytes.push({
      char: text[i],
      decimal: text.charCodeAt(i),
      hex: text.charCodeAt(i).toString(16).padStart(2, '0'),
      binary: text.charCodeAt(i).toString(2).padStart(8, '0')
    });
  }
  return bytes;
};

// Generate random key
export const generateRandomKey = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let key = '';
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
};
