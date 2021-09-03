import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import axiosClient from 'src/apis/axiosClient';
import { useSafeState } from 'src/hooks/useSafeState';
import { userAddressMapActions } from 'src/slice/UserSlice';
import { KEY } from 'src/constants';
import { Storage } from 'src/utils';

/* TODO extract to common/shared hooks only for getting Api Key */
export function useMapApiKey(getUserCurrentLocation, setError) {
  const [googleApiKey, setGoogleApiKey] = useSafeState('');

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axiosClient('/api/config/google');
        setGoogleApiKey(data);
        getUserCurrentLocation();
      })();
    } catch (err) {
      /* TODO errors report to server, websocket */
      setError(err);
    }
  }, [setError, getUserCurrentLocation, setGoogleApiKey]);

  return { googleApiKey };
}

export function useMapLocator(placeRef, setCenter, setLocation, setError) {
  const onLoadPlaces = (place) => (placeRef.current = place);

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

  return { onLoadPlaces, onPlacesChanged, getUserCurrentLocation };
}

export function useMap(setLocation) {
  const markerRef = useRef(null);
  const onMarkerLoad = (marker) => (markerRef.current = marker);

  const mapRef = useRef(null);
  const onLoad = (map) => (mapRef.current = map);

  const onIdle = () => {
    const { lat, lng } = mapRef.current.center;
    setLocation({ lat: lat(), lng: lng() });
  };

  return { onLoad, onIdle, onMarkerLoad };
}

export function useMapSubmit(history, setInfo, setError) {
  const dispatch = useDispatch();

  const onConfirm = (placeRef, { lat, lng }) => {
    const places = placeRef.current.getPlaces();
    if (places?.length !== 1) return setError('Please enter your address');

    const { formatted_address: address, name, vicinity, id: googleAddressId } = places[0];
    dispatch(userAddressMapActions._CONFIRM({ lat, lng, address, name, vicinity, googleAddressId }));

    setInfo('location selected successfully.');
    history.push('/shipping');
    return null;
  };

  const redirectBack = () => {
    history.push(Storage[KEY.HISTORY] || '/');
  };

  return { onConfirm, redirectBack };
}
