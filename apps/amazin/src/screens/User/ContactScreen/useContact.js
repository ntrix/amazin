import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { MAIL_SERVER, HEADERS } from 'src/constants';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

const checkError = ({ text, email, name }) => {
  const error = [];
  const validate = (err, msg) => (err ? error.push(msg) : null);

  validate(!text, 'Please enter your message!');
  validate(!email, 'Please enter your email!');
  validate(!name, 'Please enter your name!');
  return error;
};

export function useSubmitContact(setStatus) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);

  async function submitContact(e, data) {
    e.preventDefault();

    const error = checkError(data);
    if (error.length) return setStatus({ error });

    if ('Seller' === data.subject) return dispatch(updateUserProfile({ userId: userInfo._id, verify: true }));

    setStatus({ loading: true, message: 'Your message is being sent.' });
    dispatch(userUpdateProfileActions._RESET());
    try {
      await axios.post(MAIL_SERVER, data, { headers: { ...HEADERS, body: JSON.stringify(data) } });
      setStatus({ message: 'Thank you! Your message has been sent.' });
    } catch (err) {
      setStatus({ error: [err.message] });
    }
    return null;
  }

  return { submitContact };
}

export function useContact(setName, setEmail, setSubject, setStatus) {
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
    setStatus({ message: 'Seller Account verified successfully!' });
  }, [dispatch, paramSub, userUpdateProfile.success, setSubject, setStatus]);
}
