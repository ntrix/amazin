import { axios } from '../../utils/axiosClient';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { updateUserProfile } from '../../Controllers/userActions';
import { userUpdateProfileActions } from './UserSlice';

import MessageBox from '../../components/MessageBox';
import CustomInput from '../../components/CustomInput';
import LoadingOrError from '../../components/LoadingOrError';

export default function ContactScreen() {
  const dispatch = useDispatch();
  const { subject: paramSub } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setSubject(paramSub);
  }, [userInfo, paramSub]);

  useEffect(() => {
    setSubject(paramSub);
    if ('Seller' === paramSub && userUpdateProfile.success) {
      dispatch(userUpdateProfileActions._RESET());
      setMessage('Seller Account verified successfully!');
    }
  }, [dispatch, paramSub, userUpdateProfile.success]);

  const submitHandler = async (e) => {
    setError(false);
    e.preventDefault();

    const data = {
      text,
      email,
      subject,
      name
    };

    const errors = [];
    const validate = (err, msg) => {
      if (err) errors.push(msg);
    };
    validate(!text, 'Please enter your message!');
    validate(!email, 'Please enter your email!');
    validate(!name, 'Please enter your name!');
    if (errors.length) return setError(errors);

    if ('Seller' === subject)
      return dispatch(
        updateUserProfile({
          userId: userInfo._id,
          verify: true
        })
      );

    setLoading(true);
    try {
      await axios.post('https://mailsv.glitch.me/mail', data, {
        //"/api/user/contact"
        headers: {
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      });
      setLoading(false);
      if ('Admin' === paramSub) {
        setMessage(
          'Your Apply has been sent. Please wait 48 hours for processing!'
        );
        return false;
      }
      setMessage('Thank you! Your message has been sent.');
    } catch (err) {
      setLoading(false);
      setError([err.message]);
    }
    return false;
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <h1>Contact Us</h1>

        <LoadingOrError xl statusOf={{ loading, error }} />
        <LoadingOrError xl statusOf={userUpdateProfile} />

        <MessageBox variant="success" msg={message} />
        {message && (
          <Link to="/">
            <button className="primary">Back To Home Page</button>
          </Link>
        )}
        {!message && (
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
                  {!userInfo?.isSeller && 'Seller' === paramSub && (
                    <option value="Seller">Verify My Seller Account</option>
                  )}
                  {!userInfo?.isAdmin && 'Admin' === paramSub && (
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
