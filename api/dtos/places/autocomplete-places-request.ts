export interface AutocompletePlacesRequest {
  input: string;
  sessionToken: string;
  latitude?: number | null;
  longitude?: number | null;
}
