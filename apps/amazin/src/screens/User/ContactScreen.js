import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { axios } from 'src/apis/axiosClient';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';

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
    const validate = (err, msg) => (err ? errors.push(msg) : null);
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
      await axios.post(process.env.REACT_APP_CONTACT_MAIL_SERVER, data, {
        //"/api/user/contact"
        headers: {
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      });
      setLoading(false);
      if ('Admin' === paramSub) {
        setMessage('Your Apply has been sent. Please wait 48 hours for processing!');
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

        <MessageBox variant="success" show={message}>
          {message}
          <Button to="/" primary label="Back To Home Page" />
        </MessageBox>

        {!message && (
          <>
            <CustomInput text="Your Name" hook={[name, setName]} />
            <CustomInput text="Email" type="email" hook={[email, setEmail]} />

            <div>
              <label htmlFor="subject">Subject</label>
              <div className="select-wrapper">
                <div className="sprite__caret xl"></div>
                <select value={subject} onChange={(e) => setSubject(e.target.value)}>
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

            <CustomInput textarea rows="10" text="Your Message" hook={[text, setText]} />
            <br />
            <div>
              <Button primary type="submit" label="Send Your Message" />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
