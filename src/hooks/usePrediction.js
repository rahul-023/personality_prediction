import { useState, useCallback } from 'react';
import { predictPersonality } from '../api/predict';

export function usePrediction() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const predict = useCallback(async (text) => {
    setStatus('loading');
    setError(null);
    setData(null);

    try {
      const result = await predictPersonality(text);
      setData(result);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return { status, data, error, predict, reset };
}
