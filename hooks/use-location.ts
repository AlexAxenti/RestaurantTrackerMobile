import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

interface LocationCoords {
  latitude: number | null;
  longitude: number | null;
}

export function useLocation(): LocationCoords {
  const [coords, setCoords] = useState<LocationCoords>({ latitude: null, longitude: null });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const location = await Location.getCurrentPositionAsync({});
      setCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    })();
  }, []);

  return coords;
}
