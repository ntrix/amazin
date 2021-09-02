import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUser } from 'src/apis/userAPI';
import { userUpdateActions } from 'src/slice/UserSlice';

export function useUserEdit([setName, setEmail, setSeller, setAdmin], history, match) {
  const dispatch = useDispatch();
  const paramUserId = match.params.id;
  const { user, loading, error } = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);

  useEffect(() => {
    if (userUpdate.success) {
      dispatch(userUpdateActions._RESET());
      history.push('/user-list');
    }

    if (!user) dispatch(detailsUser(paramUserId));
    else {
      setName(user.name);
      setEmail(user.email);
      setSeller(user.isSeller);
      setAdmin(user.isAdmin);
    } // eslint-disable-next-line
  }, [user, userUpdate.success, paramUserId, history, dispatch]);

  const submitUser = (name, email, seller, admin) => (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isSeller: seller, isAdmin: admin, _id: paramUserId }));
  };

  return { user, loading, error, userUpdate, submitUser };
}
