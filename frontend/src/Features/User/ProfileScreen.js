import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userUpdateProfileActions } from "./UserSlice";
import { detailsUser, updateUserProfile } from "../../Controllers/userActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import PrivateRoute from "../Route/PrivateRoute";
import CustomInput from "../../components/CustomInput";

export default function ProfileScreen({ location }) {
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
    // if (password !== confirmPassword) {
    //   alert("Password and Confirm Password Are Not Matched");
    // } else {
    dispatch(
      updateUserProfile({
        userId: user._id,
        name,
        email,
        password,
        confirmPassword,
        oldPassword,
        sellerName,
        sellerLogo,
        sellerDescription,
      })
    );
    // }
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

        <LoadingBox xl hide={!loading} />

        {!loading && (
          <>
            <MessageBox variant="danger" msg={error} />
            <LoadingBox xl hide={!loadingUpdate} />
            <MessageBox variant="danger" msg={errorUpdate} />

            <CustomInput text="Name" hook={[name, setName]} />

            <CustomInput text="Email" type="email" hook={[email, setEmail]} />

            <PrivateRoute path="/profile/password" exact>
              <CustomInput
                text="Old Password"
                type="password"
                onChange={setOldPassword}
              />
            </PrivateRoute>

            <CustomInput
              text="Password"
              type="password"
              onChange={setPassword}
            />

            <CustomInput
              text="Confirm Password"
              type="password"
              autoComplete="off"
              onChange={setConfirmPassword}
            />

            <PrivateRoute path="/profile/seller" exact>
              {!user?.isSeller ? (
                <MessageBox variant="danger" show>
                  You don't have seller account, please apply first!
                </MessageBox>
              ) : (
                <>
                  <div>
                    <h2>Seller</h2>
                  </div>

                  <CustomInput
                    text="Seller Name"
                    hook={[sellerName, setSellerName]}
                  />

                  <CustomInput
                    text="Seller Logo"
                    hook={[sellerLogo, setSellerLogo]}
                  />

                  <CustomInput
                    text="Seller Description"
                    hook={[sellerDescription, setSellerDescription]}
                  />
                </>
              )}
            </PrivateRoute>

            <div>
              <MessageBox variant="success" show={successUpdate}>
                Profile Updated Successfully
              </MessageBox>
            </div>
            <br />

            <div>
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
