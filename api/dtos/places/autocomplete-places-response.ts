export interface AutocompletePlaceDto {
  placeId: string;
  name: string;
  address: string;
}

export interface AutocompletePlacesResponse {
  places: AutocompletePlaceDto[];
}
