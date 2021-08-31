import { useRef } from 'react';

export function useMapPosition(placeRef, setCenter, setLocation, setError) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const onLoad = (map) => (mapRef.current = map);

  const onMarkerLoad = (marker) => (markerRef.current = marker);

  const onLoadPlaces = (place) => (placeRef.current = place);

  const onIdle = () => {
    const { lat, lng } = mapRef.current.center;
    setLocation({ lat: lat(), lng: lng() });
  };

  const onPlacesChanged = () => {
    try {
      const { lat, lng } = placeRef.current.getPlaces()[0].geometry.location;
      setCenter({ lat: lat(), lng: lng() });
      setLocation({ lat: lat(), lng: lng() });
    } catch (err) {
      /* TODO errors report to server, websocket */
      setError(err);
    }
  };

  const getUserCurrentLocation = () =>
    navigator?.geolocation
      ? navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude: lat, longitude: lng } = coords;
          setCenter({ lat, lng });
          setLocation({ lat, lng });
        })
      : setError('Geolocation os not supported by this browser');

  return { onLoad, onMarkerLoad, onLoadPlaces, onIdle, onPlacesChanged, getUserCurrentLocation };
}
