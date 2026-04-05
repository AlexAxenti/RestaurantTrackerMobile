import { ResolvePlaceRequest } from '@/api/dtos/places/resolve-place-request';
import { resolvePlace } from '@/api/endpoints/places/resolve-place';
import { useQuery } from '@tanstack/react-query';

export function useResolvePlaceQuery(request: ResolvePlaceRequest) {
  return useQuery({
    queryKey: ['places', 'resolve', request.placeId],
    queryFn: () => resolvePlace(request),
    enabled: !!request.placeId,
  });
}
