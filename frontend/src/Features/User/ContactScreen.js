import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function ContactScreen(props) {
  const { subject: pSubject } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);
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
    setLoading(true);
    try {
      await Axios.post("https://mailsv.glitch.me/mail", data, {
        //"/api/user/contact"
        headers: {
          mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      });
      setLoading(false);
      setMessage("Thank you! Your message has been sent.");
    } catch (error) {
      setLoading(false);
      setError([error.message]);
    }
  };

  useEffect(() => {
    setSubject(pSubject);
  }, [pSubject]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Contact Us</h1>
        {isLoading && <LoadingBox size="xl" />}
        {hasError &&
          hasError.map((err) => (
            <MessageBox variant="danger">{err}</MessageBox>
          ))}
        {hasMessage ? (
          <>
            <MessageBox variant="success">{hasMessage}</MessageBox>
            <button className="primary">
              <Link to={"/"}>Back To Home Page</Link>
            </button>
          </>
        ) : (
          <>
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="subject">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
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
            <div>
              <label htmlFor="text">Message</label>
              <textarea
                id="text"
                rows="10"
                type="text"
                placeholder="Enter Your Message"
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
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
