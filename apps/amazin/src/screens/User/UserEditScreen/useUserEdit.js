import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUser } from 'src/apis/userAPI';
import { userUpdateActions } from 'src/slice/UserSlice';

export function useUserEdit(history, match) {
  const dispatch = useDispatch();
  const pUserId = match.params.id;
  const { user } = useSelector((state) => state.userDetails);
  const { success: isUpdated } = useSelector((state) => state.userUpdate);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seller, setSeller] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (isUpdated) {
      dispatch(userUpdateActions._RESET());
      history.push('/user-list');
    }
    if (!user) dispatch(detailsUser(pUserId));
    else {
      setName(user.name);
      setEmail(user.email);
      setSeller(user.isSeller);
      setAdmin(user.isAdmin);
    }
  }, [user, isUpdated, pUserId, history, dispatch]);

  const submitUser = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isSeller: seller, isAdmin: admin, _id: pUserId }));
  };

  return { name, setName, email, setEmail, seller, setSeller, admin, setAdmin, submitUser };
}
