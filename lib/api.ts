import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
});

export interface StandardizeResponse {
  original: string;
  standardized: string;
  confidence: number;
}

export async function standardizeName(name: string): Promise<StandardizeResponse> {
  const { data } = await api.post('/api/standardize', { name });
  return data;
}
