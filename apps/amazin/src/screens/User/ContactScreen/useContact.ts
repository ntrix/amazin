import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { MAIL_SERVER, HEADERS } from 'src/constants';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';

const compoundErrors = ({ text, email, name }: ContactType) => {
  const error = [] as string[];
  const validate = (isEmpty: boolean, msg: string) => isEmpty && error.push(msg);

  validate(!text, 'Please enter your message!');
  validate(!email, 'Please enter your email!');
  validate(!name, 'Please enter your name!');
  return error;
};

const asyncSendMessage = async (contactData: ContactType, setStatus: SetState) => {
  setStatus({ loading: true, msg: 'Your message is being sent.' });
  try {
    await axios.post(MAIL_SERVER, contactData, { headers: { ...HEADERS, body: JSON.stringify(contactData) } });
    setStatus({ msg: 'Thank you! Your message has been sent.' });
  } catch (error) {
    if (error instanceof Error) setStatus({ error: [error.message] });
  }
};

export function useSubmitContact(setStatus: SetState) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  async function submitContact(e: EventType, contactData: ContactType) {
    e.preventDefault();

    const error = compoundErrors(contactData);
    if (error.length) return setStatus({ error });

    if ('Seller' === contactData.subject)
      return dispatch(updateUserProfile({ _id: userInfo._id, name: userInfo.name, verify: true }));

    asyncSendMessage(contactData, setStatus);
    return dispatch(userUpdateProfileActions._RESET(''));
  }

  return { submitContact };
}

export function useContact(setName: SetState, setEmail: SetState, setSubject: SetState, setStatus: SetState) {
  const dispatch = useDispatch();
  const { subject: pSubject } = useParams();
  const { userInfo } = useShadow();
  const userUpdateProfile = useSelector((state: AppState) => state.userUpdateProfile);

  useEffect(() => {
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setSubject(pSubject);
  }, [userInfo, pSubject, setName, setEmail, setSubject]);

  useEffect(() => {
    setSubject(pSubject);
    if ('Seller' !== pSubject || !userUpdateProfile.success) return;
    dispatch(userUpdateProfileActions._RESET(''));
    setStatus({ msg: 'Seller Account verified successfully!' });
  }, [dispatch, pSubject, userUpdateProfile.success, setSubject, setStatus]);
}