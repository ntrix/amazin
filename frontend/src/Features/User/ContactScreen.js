import { axios } from "../../Controllers/axiosClient";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateUserProfile } from "../../Controllers/userActions";
import { userUpdateProfileActions } from "./UserSlice";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import CustomInput from "../../components/CustomInput";

export default function ContactScreen(props) {
  const { subject: pSubject } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [subject, setSubject] = useState(pSubject || "");
  const [text, setText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState([]);
  const [hasMessage, setMessage] = useState(false);

  const submitHandler = async (e) => {
    setError(false);
    e.preventDefault();

    const data = {
      text,
      email,
      subject,
      name,
    };
    const errors = [];
    if (!text) errors.push("Please enter your message!");
    if (!email) errors.push("Please enter your email!");
    if (!name) errors.push("Please enter your name!");
    if (errors.length) return setError(errors);

    if ("Seller" === subject)
      return dispatch(
        updateUserProfile({
          userId: userInfo._id,
          verify: true,
        })
      );

    setLoading(true);
    try {
      await axios.post("https://mailsv.glitch.me/mail", data, {
        //"/api/user/contact"
        headers: {
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      });
      setLoading(false);
      if ("Admin" === pSubject)
        setMessage(
          "Your Apply has been sent. Please wait 48 hours for processing!"
        );
      else setMessage("Thank you! Your message has been sent.");
    } catch (error) {
      setLoading(false);
      setError([error.message]);
    }
  };

  useEffect(() => {
    setSubject(pSubject);
    if ("Seller" === pSubject && successUpdate) {
      dispatch(userUpdateProfileActions._RESET());
      setMessage("Seller Account verified successfully!");
    }
  }, [dispatch, pSubject, successUpdate]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Contact Us</h1>
        {(isLoading || loadingUpdate) && <LoadingBox xl />}
        {hasError &&
          hasError.map((err, id) => (
            <MessageBox key={id} variant="danger">
              {err}
            </MessageBox>
          ))}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {hasMessage ? (
          <>
            {hasMessage && (
              <MessageBox variant="success">{hasMessage}</MessageBox>
            )}
            <Link to="/">
              <button className="primary">Back To Home Page</button>
            </Link>
          </>
        ) : (
          <>
            <CustomInput text="Your Name" hook={[name, setName]} />

            <CustomInput text="Email" type="email" hook={[email, setEmail]} />

            <div>
              <label htmlFor="subject">Subject</label>
              <div className="select-wrapper">
                <div className="sprite__caret xl"></div>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {!userInfo?.isSeller && "Seller" === pSubject && (
                    <option value="Seller">Verify My Seller Account</option>
                  )}
                  {!userInfo?.isAdmin && "Admin" === pSubject && (
                    <option value="Admin">Apply To Be Administrator</option>
                  )}
                  <option value="Account">Account</option>
                  <option value="Ads">Advertisement</option>
                  <option value="Customer">Customer Service</option>
                  <option value="FAQ">FAQ</option>
                  <option value="Help">Help Desk</option>
                  <option value="Orders">Your Orders</option>
                  <option value="Payment">Payment</option>
                  <option value="Report">Report Something Suspicious</option>
                  <option value="Returns">Returns & Refund</option>
                  <option value="Shipping">Shipping Address</option>
                  <option value="Others">Others..</option>
                </select>
              </div>
            </div>

            <CustomInput
              textarea
              rows="10"
              text="Your Message"
              hook={[text, setText]}
            />
            <br />

            <div>
              <button className="primary" type="submit">
                Send Your Message
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
