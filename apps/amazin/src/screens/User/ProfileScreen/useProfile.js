import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUserProfile } from 'src/apis/userAPI';
import { userUpdateProfileActions } from 'src/slice/UserSlice';

export function useUserProfile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const { user } = useSelector((state) => state.userDetails);

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

  const submitUpdate = (e, updatedSeller) => {
    e.preventDefault();
    const updatedUser = { name, email, password, oldPassword, confirmPassword, userId: user._id };
    dispatch(updateUserProfile({ ...updatedUser, ...updatedSeller }));
  };

  return { name, setName, email, setEmail, setPassword, setOldPassword, setConfirmPassword, submitUpdate };
}

export function useSellerProfile() {
  const { user } = useSelector((state) => state.userDetails);
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
