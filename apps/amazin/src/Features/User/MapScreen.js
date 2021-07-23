import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox
} from '@react-google-maps/api';

import axiosClient from '../../utils/axiosClient';
import { userAddressMapActions } from './UserSlice';

import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { LOCATION, STORAGE } from '../../constants';

const libs = ['places'];

export default function MapScreen({ history }) {
  const dispatch = useDispatch();
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [center, setCenter] = useState(LOCATION);
  const [location, setLocation] = useState(center);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axiosClient('/api/config/google');
        setGoogleApiKey(data);
        getUserCurrentLocation();
      })();
    } catch (err) {
      // TODO errors report to server, websocket
      setError(err);
    }
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng()
    });
  };

  const onPlacesChanged = () => {
    try {
      const place = placeRef.current.getPlaces()[0].geometry.location;
      setCenter({ lat: place.lat(), lng: place.lng() });
      setLocation({ lat: place.lat(), lng: place.lng() });
    } catch (err) {
      // TODO errors report to server, websocket
      setError(err);
    }
  };

  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places?.length === 1) {
      dispatch(
        userAddressMapActions._CONFIRM({
          lat: location.lat,
          lng: location.lng,
          address: places[0].formatted_address,
          name: places[0].name,
          vicinity: places[0].vicinity,
          googleAddressId: places[0].id
        })
      );
      setInfo('location selected successfully.');
      history.push('/shipping');
    } else {
      setError('Please enter your address');
    }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation os not supported by this browser');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  };

  const redirectBack = () => {
    history.push(localStorage?.getItem(STORAGE.HISTORY) || '/');
  };

  return googleApiKey ? (
    <div className="container--fluid">
      <MessageBox msg={error} />
      <MessageBox variant="success" msg={info} />

      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="sample-map"
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="address-box col-fill">
              <button className="danger btn-left" onClick={redirectBack}>
                Cancel
              </button>

              <input
                type="text"
                placeholder="Enter your address"
                className="col-fill"
              ></input>

              <button className="primary btn-right" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>

          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox xl />
  );
}
