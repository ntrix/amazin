import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

const MAIL_SERVER = process.env.REACT_APP_CONTACT_MAIL_SERVER;
const HEADERS = { mode: 'cors', headers: { 'Content-Type': 'application/json' } };

const checkError = ({ text, email, name }, setError) => {
  const errors = [];
  const validate = (err, msg) => (err ? errors.push(msg) : null);

  validate(!text, 'Please enter your message!');
  validate(!email, 'Please enter your email!');
  validate(!name, 'Please enter your name!');

  setError(errors);
  return !!errors.length;
};

export function useSubmitContact(setLoading, setMessage, setError) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);

  const contact = async (data) => {
    try {
      setLoading(true);
      dispatch(userUpdateProfileActions._RESET());
      setMessage('Thank you! Your message is being sent.');
      await axios.post(MAIL_SERVER, data, { headers: { ...HEADERS, body: JSON.stringify(data) } });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError([err.message]);
    }
  };

  const submitContact = async (e, data) => {
    e.preventDefault();
    if (checkError(data, setError)) return;
    if ('Seller' !== data.subject) contact(data);
    else dispatch(updateUserProfile({ userId: userInfo._id, verify: true }));
  };

  return { submitContact };
}

export function useContact(setName, setEmail, setSubject, setMessage) {
  const dispatch = useDispatch();
  const { subject: paramSub } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setSubject(paramSub);
  }, [userInfo, paramSub, setName, setEmail, setSubject]);

  useEffect(() => {
    setSubject(paramSub);
    if ('Seller' !== paramSub || !userUpdateProfile.success) return;
    dispatch(userUpdateProfileActions._RESET());
    setMessage('Seller Account verified successfully!');
  }, [dispatch, paramSub, userUpdateProfile.success, setSubject, setMessage]);
}
