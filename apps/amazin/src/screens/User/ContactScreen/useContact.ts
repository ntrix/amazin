import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { validateAll } from 'src/utils';
import { sendContactMessage, updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';

export function useSubmitContact(setStatus: SetStateType<StatusType>) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  function submitContact(e: EventType, contactInfo: ContactType) {
    e.preventDefault();

    const error = validateAll(contactInfo);
    if (error) return setStatus({ error });

    const { name, email } = contactInfo as UserType;
    if ('Seller' === contactInfo.subject)
      return dispatch(updateUserProfile({ _id: userInfo._id, name, email, verify: true }));

    dispatch(sendContactMessage(contactInfo, setStatus));
  }

  return { submitContact };
}

export function useContact(
  setName: SetStateType<string>,
  setEmail: SetStateType<string>,
  setSubject: SetStateType<string>,
  setStatus: SetStateType<StatusType>
) {
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
