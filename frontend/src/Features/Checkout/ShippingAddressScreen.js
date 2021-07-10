import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { saveShippingAddress } from "../../Controllers/cartActions";

import CheckoutSteps from "./CheckoutSteps";
import CustomInput from "../../components/CustomInput";

export default function ShippingAddressScreen({ history }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { shippingAddress } = useSelector((state) => state.cart);
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) history.push("/signin");

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setFullName(shippingAddress.fullName);
    setAddress(shippingAddress.address);
    setCity(shippingAddress.city);
    setPostalCode(shippingAddress.postalCode);
    setCountry(shippingAddress.country);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng)
      moveOn = window.confirm("Continue setting your location?");
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      history.push("/payment");
    }
  };

  const location = useLocation();
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        city,
        postalCode,
        country,
        lat,
        lng,
      })
    );
    localStorage.setItem("backToHistory", location.pathname);
    history.push("/map");
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
        <CustomInput
          text="Postal Code"
          required
          hook={[postalCode, setPostalCode]}
        />
        <CustomInput text="Country" required hook={[country, setCountry]} />

        <div>
          <label htmlFor="chooseOnMap">Location</label>
          <button type="button" onClick={chooseOnMap}>
            Choose On Map
          </button>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
