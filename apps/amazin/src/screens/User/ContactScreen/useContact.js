import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

const MAIL_SERVER = process.env.REACT_APP_CONTACT_MAIL_SERVER;
const HEADERS = { mode: 'cors', headers: { 'Content-Type': 'application/json' } };
const setHeader = (data) => ({ headers: { ...HEADERS, body: JSON.stringify(data) } });

const checkError = ({ text, email, name }) => {
  const errors = [];
  const validate = (err, msg) => (err ? errors.push(msg) : null);

  validate(!text, 'Please enter your message!');
  validate(!email, 'Please enter your email!');
  validate(!name, 'Please enter your name!');
  return errors;
};

export function useSubmitContact(setLoading, setMessage, setError) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);

  async function submitContact(e, data) {
    e.preventDefault();

    const errors = checkError(data);
    if (errors.length) return setError(errors);

    if ('Seller' === data.subject) return dispatch(updateUserProfile({ userId: userInfo._id, verify: true }));

    setMessage('Thank you! Your message is being sent.');
    setLoading(true);
    dispatch(userUpdateProfileActions._RESET());
    try {
      await axios.post(MAIL_SERVER, data, setHeader());
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError([err.message]);
    }
    return null;
  }

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
