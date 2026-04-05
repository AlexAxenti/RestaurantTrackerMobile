import apiClient from '@/api/client';
import { ResolvePlaceRequest } from '@/api/dtos/places/resolve-place-request';
import { ResolvedPlaceResponse } from '@/api/dtos/places/resolved-place-dto';

export async function resolvePlace(request: ResolvePlaceRequest): Promise<ResolvedPlaceResponse> {
  const { data } = await apiClient.post<ResolvedPlaceResponse>('/api/places/resolve', request);
  return data;
}
