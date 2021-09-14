import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useSafeState } from 'src/hooks/useSafeState';
import { saveShippingAddress } from 'src/apis/cartAPI';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export function useShipInfo({ history }: RouteOption) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();
  if (!userInfo) history.push('/signin');

  const { address: mapAddress } = useSelector((state: AppState) => state.userAddressMap);
  const { shippingAddress }: { shippingAddress: AddressType } = useSelector((state: AppState) => state.cart);
  const [shipInfo, setShipInfo] = useSafeState(shippingAddress);

  const location = useLocation();
  const locateOnMap = () => {
    dispatch(saveShippingAddress(shipInfo));
    Storage[KEY.HISTORY] = location.pathname;
    history.push('/map');
  };

  useEffect(() => {
    setShipInfo(shippingAddress);
  }, [shippingAddress, setShipInfo]);

  const submitShipInfo = (e) => {
    e.preventDefault();
    const { lat, lng } = mapAddress ?? shipInfo;

    if (mapAddress || window.confirm('Continue setting your location?')) {
      dispatch(saveShippingAddress({ ...shipInfo, lat, lng }));
      history.push('/payment');
    }
  };

  return { shipInfo, setShipInfo, locateOnMap, submitShipInfo };
}
