import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { detailsUser, updateUserProfile } from 'src/apis/userAPI';
import { useShadow } from 'src/hooks/useShadow';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

export function useUserProfile({ user }) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(userUpdateProfileActions._RESET(''));
      dispatch(detailsUser(userInfo?._id));
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setOldPassword('');
  }, [dispatch, userInfo._id, user]);

  const submitUpdate = (e: EventType, seller?: SellerType) => {
    e.preventDefault();
    const updatedInfo: UserType & ReqLogin = {
      name,
      email,
      password,
      oldPassword,
      confirmPassword,
      _id: user._id,
      seller
    };
    dispatch(updateUserProfile(updatedInfo));
  };

  return { name, setName, email, setEmail, setPassword, setOldPassword, setConfirmPassword, submitUpdate };
}
