import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { saveShippingAddress } from 'src/apis/cartAPI';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';

export function useShipInfo(history) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  if (!userInfo) history.push('/signin');

  const { address: mapAddress } = useSelector((state) => state.userAddressMap);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [shipInfo, setShipInfo] = useState(shippingAddress);

  const location = useLocation();
  const locateOnMap = () => {
    dispatch(saveShippingAddress(shipInfo));
    Storage[KEY.HISTORY] = location.pathname;
    history.push('/map');
  };

  useEffect(() => {
    setShipInfo(shippingAddress);
  }, [shippingAddress]);

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
