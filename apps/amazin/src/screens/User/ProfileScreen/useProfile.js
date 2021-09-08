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
      dispatch(userUpdateProfileActions._RESET());
      dispatch(detailsUser(userInfo._id));
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setOldPassword('');
  }, [dispatch, userInfo._id, user]);

  const submitUpdate = (e, updatedSellerInfo) => {
    e.preventDefault();
    const updatedInfo = { name, email, password, oldPassword, confirmPassword, userId: user._id };
    dispatch(updateUserProfile({ ...updatedInfo, ...updatedSellerInfo }));
  };

  return { name, setName, email, setEmail, setPassword, setOldPassword, setConfirmPassword, submitUpdate };
}

export function useSellerProfile({ user }) {
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  useEffect(() => {
    if (!user || !user.seller) return;
    setSellerName(user.seller.name);
    setSellerLogo(user.seller.logo);
    setSellerDescription(user.seller.description);
  }, [user]);

  return { sellerName, setSellerName, sellerLogo, setSellerLogo, sellerDescription, setSellerDescription };
}
