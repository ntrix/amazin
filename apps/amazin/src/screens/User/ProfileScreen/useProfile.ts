import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { detailsUser, updateUserProfile } from 'src/apis/userAPI';
import { useShadow } from 'src/hooks/useShadow';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

export function useUserProfile(user: UserType, setPasswords: SetStateType<(string | undefined)[]>) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(userUpdateProfileActions._RESET(''));
      dispatch(detailsUser(userInfo._id));
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setPasswords(['']);
  }, [dispatch, userInfo._id, user, setPasswords]);

  const submitUpdate = (e: EventType, passwords: (string | undefined)[], seller?: SellerType) => {
    e.preventDefault();
    const [oldPassword, password = user.password, confirmPassword] = passwords;
    const updatedInfo: UserType & ReqLogin = {
      _id: user._id,
      name,
      email,
      password,
      oldPassword,
      confirmPassword,
      seller
    };
    dispatch(updateUserProfile(updatedInfo, 'put'));
  };

  return { name, setName, email, setEmail, submitUpdate };
}
