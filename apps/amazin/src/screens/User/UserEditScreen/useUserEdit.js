import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUser } from 'src/apis/userAPI';
import { userUpdateActions } from 'src/slice/UserSlice';

export function useUserEdit(history, paramUserId) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const { success: isUserUpdated } = useSelector((state) => state.userUpdate);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seller, setSeller] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (isUserUpdated) {
      dispatch(userUpdateActions._RESET());
      history.push('/user-list');
    }

    if (!user) dispatch(detailsUser(paramUserId));
    else {
      setName(user.name);
      setEmail(user.email);
      setSeller(user.isSeller);
      setAdmin(user.isAdmin);
    }
  }, [user, isUserUpdated, paramUserId, history, dispatch]);

  const submitUser = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isSeller: seller, isAdmin: admin, _id: paramUserId }));
  };

  return { name, email, seller, admin, setName, setEmail, setSeller, setAdmin, submitUser };
}
