import { useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

import { LOCATION } from 'src/constants';
import { useMapApiKey, useMap, useMapLocator, useMapSubmit } from './useMapAPIs';
import MapSearchBox from './MapSearchBox';
import MessageBox from 'src/components/MessageBox';
import LoadingBox from 'src/components/LoadingBox';
const libs = ['places'];

export default function MapScreen() {
  const [center, setCenter] = useState(LOCATION);
  const [location, setLocation] = useState(center);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const placeRef = useRef(null);

  const mapAPI = useMapLocator(placeRef, setCenter, setLocation, setError);
  const { onLoadPlaces, onPlacesChanged, getUserCurrentLocation } = mapAPI;
  const { onLoad, onIdle, onMarkerLoad } = useMap(setLocation);
  const { onConfirm, redirectBack } = useMapSubmit(setInfo, setError);

  const { googleApiKey } = useMapApiKey(getUserCurrentLocation, setError);
  if (!googleApiKey) return <LoadingBox xl />;

  const setting = { zoom: 15, center, onLoad, onIdle };
  return (
    <div className="container--fluid">
      <MessageBox variant={info ? 'success' : undefined} msg={info || error} />

      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap id="sample-map" mapContainerStyle={{ height: '100%', width: '100%' }} {...setting}>
          <StandaloneSearchBox onLoad={onLoadPlaces} onPlacesChanged={onPlacesChanged}>
            <MapSearchBox redirectBack={redirectBack} onConfirm={() => onConfirm(placeRef, location)} />
          </StandaloneSearchBox>

          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
