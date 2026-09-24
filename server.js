import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

const PORT = Number(process.env.PORT || 8000);
const TYPES = [
  'INFJ', 'ENTP', 'ISTJ', 'INFP', 'INTP', 'INTJ',
  'ENFP', 'ENFJ', 'ISFJ', 'ISFP', 'ESTP', 'ESFP',
  'ESTJ', 'ESFJ', 'ENTJ', 'ISTP'
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

export function generatePrediction(text) {
  const normalized = String(text || '').trim();
  if (!normalized) {
    throw new Error('Text is required');
  }

  const seed = normalized.toLowerCase().split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = seed % TYPES.length;
  const type = TYPES[index];

  const chosenProbability = 0.68 + ((seed % 11) / 100);
  const topK = TYPES.map((candidate, candidateIndex) => {
    if (candidate === type) {
      return { type: candidate, probability: Number(chosenProbability.toFixed(3)) };
    }

    const probability = Math.max(0.08, Number((0.42 - candidateIndex * 0.02 + (seed % 7) * 0.01).toFixed(3)));
    return { type: candidate, probability };
  }).sort((a, b) => b.probability - a.probability).slice(0, 6);

  const dichotomies = {
    IE: {
      score: type.startsWith('I') ? 0.72 : 0.28,
      label: type.startsWith('I') ? 'Introverted' : 'Extraverted',
    },
    SN: {
      score: type.includes('N') ? 0.74 : 0.26,
      label: type.includes('N') ? 'Intuitive' : 'Observant',
    },
    FT: {
      score: type.includes('F') ? 0.7 : 0.3,
      label: type.includes('F') ? 'Feeling' : 'Thinking',
    },
    JP: {
      score: type.endsWith('J') ? 0.68 : 0.32,
      label: type.endsWith('J') ? 'Judging' : 'Perceiving',
    },
  };

  return {
    type,
    nickname: {
      INFJ: 'Advocate',
      ENTP: 'Debater',
      ISTJ: 'Logistician',
      INFP: 'Mediator',
      INTP: 'Logician',
      INTJ: 'Architect',
      ENFP: 'Campaigner',
      ENFJ: 'Protagonist',
      ISFJ: 'Defender',
      ISFP: 'Adventurer',
      ESTP: 'Entrepreneur',
      ESFP: 'Entertainer',
      ESTJ: 'Executive',
      ESFJ: 'Consul',
      ENTJ: 'Commander',
      ISTP: 'Virtuoso',
    }[type],
    confidence: Number(chosenProbability.toFixed(3)),
    dichotomies,
    top_k: topK,
  };
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  // --- API Endpoints ---
  if (url.pathname === '/model-info') {
    sendJson(res, 200, {
      model: 'Mock MBTI Model',
      accuracy: 0.647,
      rows: 1284,
    });
    return;
  }

  if (url.pathname === '/predict') {
    if (req.method !== 'POST') {
      sendJson(res, 405, { detail: 'Method not allowed' });
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        const text = parsed.text || '';

        if (!text.trim() || text.trim().length < 20) {
          sendJson(res, 400, { detail: 'Text must be at least 20 characters' });
          return;
        }

        const result = generatePrediction(text);
        sendJson(res, 200, result);
      } catch (error) {
        sendJson(res, 400, { detail: error.message || 'Invalid request body' });
      }
    });

    return;
  }

  // --- Static Frontend Serving (Vite 'dist' folder) ---
  let filePath = path.join(DIST_DIR, url.pathname === '/' ? 'index.html' : url.pathname);

  fs.stat(filePath, (err, stats) => {
    // If the static asset doesn't exist, fallback to index.html for Single Page Application routing
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        sendJson(res, 500, { detail: 'Error loading page' });
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default server;