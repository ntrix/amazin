import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { signin, updateUserProfile } from "../../Controllers/userActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { updateCurrencyRates } from "../../Controllers/productActions";
import { pipe } from "../../utils";

export default function SigninScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(updateCurrencyRates());
      if (userInfo.currency) pipe.setCurrency(userInfo.currency);
      else
        dispatch(
          updateUserProfile({
            userId: userInfo._id,
            currency: pipe.currency,
          })
        );
      history.push(redirect);
    }
  }, [dispatch, history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              <b>Create your account</b>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
