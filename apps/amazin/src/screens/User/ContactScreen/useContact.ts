import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { axios } from 'src/apis/axiosClient';
import { MAIL_SERVER, HEADERS, validateRules } from 'src/constants';
import { updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';

const compoundErrors = ({ name, email, text }: ContactType) => {
  const error: string[] = [];
  const validate = (isEmpty: boolean, msg: string) => isEmpty && error.push(msg);

  validate(!name, 'Please enter your name!');
  validate(!email, 'Please enter your email!');

  const validateRule = validateRules['message'];
  const regEx = new RegExp(validateRule.RegEx, 'g');
  validate(!text, 'Please enter your message!');
  !!text && validate(!regEx.test(text), validateRule.msg);
  return error;
};

/* this contact will not be sent to redux store since MAIL_SERVER is different */
const sendContactMessage = (contactData: ContactType, setStatus: SetState) => async (dispatch: AppDispatch) => {
  setStatus({ loading: true, msg: 'Your message is being sent.' });
  try {
    await axios.post(MAIL_SERVER, contactData, { headers: { ...HEADERS, body: JSON.stringify(contactData) } });
    setStatus({ msg: 'Thank you! Your message has been sent.' });
  } catch (error) {
    if (error instanceof Error) setStatus({ error: [error.message] });
  }
  dispatch(userUpdateProfileActions._RESET(''));
};

export function useSubmitContact(setStatus: SetState) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  async function submitContact(e: EventType, contactInfo: ContactType) {
    e.preventDefault();

    const error = compoundErrors(contactInfo);
    if (error.length) return setStatus({ error });
    const contact = contactInfo as UserType;

    if ('Seller' === contactInfo.subject)
      return dispatch(updateUserProfile({ _id: userInfo._id, name: contact.name, email: contact.email, verify: true }));

    dispatch(sendContactMessage(contactInfo, setStatus));
  }

  return { submitContact };
}

export function useContact(setName: SetState, setEmail: SetState, setSubject: SetState, setStatus: SetState) {
  const dispatch = useDispatch();
  const { subject: pSubject }: { subject: string } = useParams();
  const { userInfo } = useShadow();
  const userUpdateProfile: StatusType = useSelector((state: AppState) => state.userUpdateProfile);

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
