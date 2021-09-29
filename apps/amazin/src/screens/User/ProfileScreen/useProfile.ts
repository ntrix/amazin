import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUserProfile } from 'src/apis/userAPI';
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
  }, [dispatch, userInfo._id, user, setPasswords]);

  useEffect(() => {
    return () => {
      dispatch(userUpdateProfileActions._RESET(''));
    };
  }, [dispatch]);

  return { name, setName, email, setEmail };
}

export function useSellerProfile(location: LocationProp) {
  const dispatch = useDispatch();
  const userDetails: UserDetailType = useSelector((state: AppState) => state.userDetails);
  const { user } = userDetails;

  const [seller, setSeller] = useState(user?.seller);

  useEffect(() => {
    if (user?.seller) setSeller(user.seller);
  }, [user, location]);

  const submitUpdate = (e: EventType, name: string, email: string, passwords: (string | undefined)[]) => {
    e.preventDefault();
    if (!user) return;

    const [oldPassword, password = user.password, confirmPassword] = passwords;
    const updateUser: UserType & ReqLogin = { _id: user._id, name, email, password, isSeller: user?.isSeller };
    if (oldPassword) updateUser.oldPassword = oldPassword;
    if (confirmPassword) updateUser.confirmPassword = confirmPassword;
    if (user?.isSeller) updateUser.seller = seller || user?.seller;

    const error = validateAll(updateUser);
    if (error) dispatch(userUpdateProfileActions._FAIL(error));
    else dispatch(updateUserProfile(updateUser, 'put'));
  };

  return { userDetails, seller, setSeller, submitUpdate };
}
