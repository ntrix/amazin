import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUserProfile } from 'src/apis/userAPI';
import { DUMMY_SELLER } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { validateAll } from 'src/utils';

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
    return () => {
      dispatch(userUpdateProfileActions._RESET(''));
    };
  }, [dispatch, userInfo._id, user, setPasswords]);

  const submitUpdate = (e: EventType, passwords: (string | undefined)[], seller?: SellerType) => {
    e.preventDefault();

    const [oldPassword, password = user.password, confirmPassword] = passwords;
    const updateUser = { _id: user._id, name, email, password, oldPassword, confirmPassword, seller };

    const error = validateAll(updateUser);
    if (error) dispatch(userUpdateProfileActions._FAIL(error));
    else dispatch(updateUserProfile(updateUser as UserType & ReqLogin, 'put'));
  };

  return { name, setName, email, setEmail, submitUpdate };
}

export function useSellerProfile() {
  const userDetails: UserDetailType = useSelector((state: AppState) => state.userDetails);

  const [seller, setSeller] = useState<SellerType>(userDetails?.user?.seller ?? DUMMY_SELLER.seller);

  useEffect(() => {
    if (userDetails?.user?.seller) setSeller(userDetails?.user?.seller);
  }, [userDetails, setSeller]);

  return { userDetails, seller, setSeller };
}
