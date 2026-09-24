import { describe, it, expect } from 'vitest';
import { generatePrediction } from './server.js';

describe('generatePrediction', () => {
  it('returns a valid MBTI result for text input', () => {
    const result = generatePrediction('I enjoy thoughtful planning and helping others, but I also value creativity and deep conversations.');

    expect(result).toHaveProperty('type');
    expect(result.type).toMatch(/^[A-Z]{4}$/);
    expect(result.confidence).toBeGreaterThan(0.5);
    expect(result.dichotomies).toBeTruthy();
    expect(result.top_k.length).toBeGreaterThan(0);
  });
});
