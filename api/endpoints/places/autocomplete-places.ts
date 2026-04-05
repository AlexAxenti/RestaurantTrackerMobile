import apiClient from '@/api/client';
import { AutocompletePlacesRequest } from '@/api/dtos/places/autocomplete-places-request';
import { AutocompletePlacesResponse } from '@/api/dtos/places/autocomplete-places-response';

export async function autocompletePlaces(
  request: AutocompletePlacesRequest
): Promise<AutocompletePlacesResponse> {
  const { data } = await apiClient.post<AutocompletePlacesResponse>(
    '/api/places/autocomplete',
    request
  );
  return data;
}
