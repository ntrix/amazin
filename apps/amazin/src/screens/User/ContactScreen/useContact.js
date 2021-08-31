import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { userUpdateProfileActions } from 'src/slice/UserSlice';

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
