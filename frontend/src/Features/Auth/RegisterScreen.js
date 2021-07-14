import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "../../Controllers/userActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CustomInput from "../../components/CustomInput";

export default function RegisterScreen({ location, history }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>

        <LoadingBox hide={!loading} />
        <MessageBox variant="danger" msg={error} />

        <CustomInput text="Name" required hook={[name, setName]} />

        <CustomInput
          text="Email"
          type="email"
          required
          hook={[email, setEmail]}
        />

        <CustomInput
          text="Password"
          type="password"
          required
          hook={[password, setPassword]}
        />

        <CustomInput
          text="Confirm Password"
          type="password"
          required
          hook={[confirmPassword, setConfirmPassword]}
        />

        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>

        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
