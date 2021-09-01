import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
const MAIL_SERVER = process.env.REACT_APP_CONTACT_MAIL_SERVER;
const HEADERS = { 'Content-Type': 'application/json' };

const checkError = (data) => {
  const errors = [];

  const validate = (err, msg) => (err ? errors.push(msg) : null);

  validate(!data.text, 'Please enter your message!');
  validate(!data.email, 'Please enter your email!');
  validate(!data.name, 'Please enter your name!');

  return errors.length ? errors : false;
};

export function useSubmitContact(setLoading, setMessage, setError) {
  const dispatch = useDispatch();
  const { subject: paramSub } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);

  const submitContact = async (e, data = {}) => {
    e.preventDefault();

    setError(checkError(data));
    if (checkError(data)) return null;

    if ('Seller' === data.subject) return dispatch(updateUserProfile({ userId: userInfo._id, verify: true }));

    dispatch(userUpdateProfileActions._RESET());
    setLoading(true); // "/api/user/contact"
    try {
      const headers = { mode: 'cors', headers: HEADERS, body: JSON.stringify(data) };
      await axios.post(MAIL_SERVER, data, { headers });
      setLoading(false);

      if ('Admin' !== paramSub) setMessage('Thank you! Your message has been sent.');
      else setMessage('Your Apply has been sent. Please wait 48 hours for processing!');
    } catch (err) {
      setLoading(false);
      setError([err.message]);
    }
    return null;
  };

  return { submitContact };
}
