import { apiClient } from './client';

export async function predictPersonality(text) {
  return apiClient('/predict', {
    method: 'POST',
    body: { text },
  });
}

export async function getModelInfo() {
  return apiClient('/model-info');
}
