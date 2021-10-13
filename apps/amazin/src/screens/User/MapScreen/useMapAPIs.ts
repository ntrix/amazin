import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import axiosClient from 'src/apis/axiosClient';
import { useSafeState } from 'src/hooks/useSafeState';
import { userAddressMapActions } from 'src/slice/UserSlice';
import { KEY } from 'src/constants';
import { Storage } from 'src/utils';

/* TODO extract to common/shared hooks only for getting Api Key */
export function useMapApiKey(getUserCurrentLocation: FnType, setStatus: SetStateType<StatusType>): {googleApiKey: error;
}  {
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
      setStatus({ error: String(err) });
    }
  }, [setStatus, getUserCurrentLocation, setGoogleApiKey]);

  return { googleApiKey };
}

export function useMapLocator(
  placeRef: Ref<LocationType>,
  setCenter: SetStateType<LocationType>,
  setLocation: SetStateType<LocationType>,
  setStatus: SetStateType<StatusType>
) {
  const onLoadPlaces = (place: LocationType) => {
    placeRef.current = place;
  };

  const onPlacesChanged = () => {
    try {
      const { lat, lng } = placeRef.current.getPlaces()[0].geometry.location as LocationType;
      setCenter({ lat: lat(), lng: lng() });
      setLocation({ lat: lat(), lng: lng() });
    } catch (err) {
      /* TODO errors report to server, websocket */
      setStatus({ error: String(err) });
    }
  };

  const getUserCurrentLocation = () =>
    navigator?.geolocation
      ? navigator.geolocation.getCurrentPosition(({ coords }) => {
          const { latitude: lat, longitude: lng } = coords;
          setCenter({ lat, lng });
          setLocation({ lat, lng });
        })
      : setStatus({ error: 'Geolocation os not supported by this browser' });

  return { onLoadPlaces, onPlacesChanged, getUserCurrentLocation };
}

export function useMap(setLocation: SetStateType<LocationType>) {
  const markerRef = useRef<LocationType>({});
  const onMarkerLoad = (marker: LocationType) => (markerRef.current = marker);

  const mapRef = useRef<MapType>({ center: {} });
  const onLoad = (map: MapType) => (mapRef.current = map);

  const onIdle = () => {
    const { lat, lng } = mapRef.current.center as { lat: FnType; lng: FnType };
    setLocation({ lat: lat(), lng: lng() });
  };

  return { onLoad, onIdle, onMarkerLoad };
}

export function useMapSubmit(history: HistoryProp, setStatus: SetStateType<StatusType>) {
  const dispatch = useDispatch();

  const onConfirm = (placeRef: Ref<LocationType>, { lat, lng }: LocationType) => {
    const places = placeRef.current.getPlaces();
    if (places?.length !== 1) return setStatus({ error: 'Please enter your address' });

    const { formatted_address: address, name, vicinity, id: googleAddressId } = places[0];
    dispatch(userAddressMapActions._CONFIRM({ lat, lng, address, name, vicinity, googleAddressId }));

    setStatus({ msg: 'location selected successfully.' });
    history.push('/shipping');
    return null;
  };

  const redirectBack = () => {
    history.push(Storage[KEY.HISTORY] || '/');
  };

  return { onConfirm, redirectBack };
}
