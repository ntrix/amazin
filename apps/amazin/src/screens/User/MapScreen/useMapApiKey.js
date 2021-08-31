import { useEffect, useState } from 'react';
import axiosClient from 'src/apis/axiosClient';

/* TODO extract to common/shared hooks only for getting Api Key */
export function useMapApiKey(getUserCurrentLocation, setError) {
  const [googleApiKey, setGoogleApiKey] = useState('');

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
  }, [setError, getUserCurrentLocation]);

  return { googleApiKey };
}
