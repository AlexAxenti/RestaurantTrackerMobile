import apiClient from '@/api/client';

export async function checkHealth(): Promise<void> {
  try {
    await apiClient.get('/api/health');
    console.log('[health] success');
  } catch (err) {
    console.log('[health] error:', err);
    throw err;
  }
}
