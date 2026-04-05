import { AutocompletePlacesRequest } from '@/api/dtos/places/autocomplete-places-request';
import { autocompletePlaces } from '@/api/endpoints/places/autocomplete-places';
import { useQuery } from '@tanstack/react-query';

export function useAutocompletePlacesQuery(request: Omit<AutocompletePlacesRequest, 'sessionToken'> & { sessionToken: string }) {
  return useQuery({
    queryKey: ['places', 'autocomplete', request.input, request.latitude, request.longitude],
    queryFn: () => autocompletePlaces(request),
    enabled: !!request.input.trim(),
  });
}
