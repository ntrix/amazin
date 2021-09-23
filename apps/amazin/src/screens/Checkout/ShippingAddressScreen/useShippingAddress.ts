import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useSafeState } from 'src/hooks/useSafeState';
import { saveShippingAddress } from 'src/apis/cartAPI';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

export function useShipInfo() {
  const { shippingAddress }: { shippingAddress: AddressType } = useSelector((state: AppState) => state.cart);
  const [shipInfo, setShipInfo] = useSafeState(shippingAddress);

  useEffect(() => {
    setShipInfo(shippingAddress);
  }, [shippingAddress, setShipInfo]);

  const createHook: FnType = (key: keyof AddressType) => [
    shipInfo[key],
    (value: string | number) => setShipInfo({ ...shipInfo, [key]: value })
  ];

  return { shipInfo, createHook };
}

export function useShippingAddress(history: HistoryProp) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();
  if (!userInfo) history.push('/signin');

  const { address: mapAddress }: { address: AddressType } = useSelector((state: AppState) => state.userAddressMap);
  const { shipInfo, createHook } = useShipInfo();

  const location = useLocation();
  const locateOnMap = () => {
    dispatch(saveShippingAddress(shipInfo));
    Storage[KEY.HISTORY] = location.pathname;
    history.push('/map');
  };

  const submitShipInfo = (e: EventType) => {
    e.preventDefault();
    const { lat, lng } = mapAddress ?? shipInfo;

    if (mapAddress || window.confirm('Continue setting your location?')) {
      dispatch(saveShippingAddress({ ...shipInfo, lat, lng }));
      history.push('/payment');
    }
  };

  return { createHook, locateOnMap, submitShipInfo };
}
