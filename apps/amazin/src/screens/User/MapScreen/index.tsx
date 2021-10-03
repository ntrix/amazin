import { useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

import { LOCATION } from 'src/constants';
import { useMapApiKey, useMap, useMapLocator, useMapSubmit } from './useMapAPIs';
import MapSearchBox from './MapSearchBox';
import LoadingBox from 'src/components/LoadingBox';
import { useSafeState } from 'src/hooks/useSafeState';
import LoadingOrError from 'src/components/LoadingOrError';
const libs = ['places'] as ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[];

export default function MapScreen({ history }: RouteProps<MatchParams>) {
  const [center, setCenter] = useSafeState(LOCATION);
  const [location, setLocation] = useSafeState(center);
  const [status, setStatus] = useSafeState({});
  const placeRef = useRef<LocationType>(null);

  const mapAPI = useMapLocator(placeRef, setCenter, setLocation, setStatus);
  const { onLoadPlaces, onPlacesChanged, getUserCurrentLocation } = mapAPI;
  const { onLoad, onIdle, onMarkerLoad } = useMap(setLocation);
  const { onConfirm, redirectBack } = useMapSubmit(history, setStatus);

  const { googleApiKey } = useMapApiKey(getUserCurrentLocation, setStatus);
  if (!googleApiKey) return <LoadingBox xl />;

  const setting = { zoom: 15, center, onLoad, onIdle };
  return (
    <div className="container--fluid">
      <LoadingOrError statusOf={status} />

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
