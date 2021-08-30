import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { saveShippingAddress } from 'src/apis/cartAPI';
import CheckoutSteps from './CheckoutSteps';
import CustomInput from 'src/components/CustomInput';
import { Storage } from 'src/utils';
import { KEY } from 'src/constants';

export default function ShippingAddressScreen({ history }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  if (!userInfo) history.push('/signin');
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;
  const { shippingAddress } = useSelector((state) => state.cart);
  const [locate, setLocate] = useState({
    lat: shippingAddress.lat,
    lng: shippingAddress.lng
  });
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    setFullName(shippingAddress.fullName);
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, [shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    const { lat, lng } = addressMap || locate;
    if (addressMap) setLocate({ lat, lng });

    if ((!lat || !lng) && window.confirm('Continue setting your location?')) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat,
          lng
        })
      );
      history.push('/payment');
    }
  };

  const location = useLocation();
  const locateOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat: locate.lat,
        lng: locate.lng
      })
    );
    Storage[KEY.HISTORY] = location.pathname;
    history.push('/map');
  };

  return (
    <div className="screen--light">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <CustomInput text="Full Name" required hook={[fullName, setFullName]} />
        <CustomInput text="Address" required hook={[address, setAddress]} />
        <CustomInput text="City" required hook={[city, setCity]} />
        <CustomInput text="Postal Code" required hook={[postalCode, setPostalCode]} />
        <CustomInput text="Country" required hook={[country, setCountry]} />
        <CustomInput text="Locate On Map" type="button" onClick={locateOnMap} />
        <CustomInput text="Continue" type="submit" className="primary btn" label="none" />
      </form>
    </div>
  );
}
