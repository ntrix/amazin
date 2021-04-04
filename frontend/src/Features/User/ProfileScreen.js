import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userUpdateProfileActions } from "./UserSlice";
import { detailsUser, updateUserProfile } from "../../Controllers/userActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import PrivateRoute from "../Route/PrivateRoute";

export default function ProfileScreen({ location }) {
  //const isSellerProfile = location.pathname?.split("/")[2] === "seller";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState("");
  const [sellerDescription, setSellerDescription] = useState("");

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          oldPassword,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(userUpdateProfileActions._RESET());
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setOldPassword("");
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
        </div>
        {loading ? (
          <LoadingBox xl />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox xl />}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}

            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <PrivateRoute path="/profile/password" exact>
              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  id="oldPassword"
                  type="password"
                  placeholder="Enter old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                ></input>
              </div>
            </PrivateRoute>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>

            <PrivateRoute path="/profile/seller" exact>
              {!user?.isSeller ? (
                <MessageBox variant="danger">
                  You don't have seller account, please apply first!
                </MessageBox>
              ) : (
                <>
                  <div>
                    <h2>Seller</h2>
                  </div>
                  <div>
                    <label htmlFor="sellerName">Seller Name</label>
                    <input
                      id="sellerName"
                      type="text"
                      placeholder="Enter Seller Name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerLogo">Seller Logo</label>
                    <input
                      id="sellerLogo"
                      type="text"
                      placeholder="Enter Seller Logo"
                      value={sellerLogo}
                      onChange={(e) => setSellerLogo(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerDescription">
                      Seller Description
                    </label>
                    <input
                      id="sellerDescription"
                      type="text"
                      placeholder="Enter Seller Description"
                      value={sellerDescription}
                      onChange={(e) => setSellerDescription(e.target.value)}
                    ></input>
                  </div>
                </>
              )}
            </PrivateRoute>

            <div>
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Updated Successfully
                </MessageBox>
              )}
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
