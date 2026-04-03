import { checkHealth } from '@/api/endpoints/health/check-health';
import { useQuery } from '@tanstack/react-query';

export function useHealthQuery(enabled = true) {
  return useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    retry: false,
    enabled,
  });
}
