import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, listUsers } from 'src/apis/userAPI';
import { userDetailsActions } from 'src/slice/UserSlice';

export function useUserList() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userDelete = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(userDetailsActions._RESET());
  }, [dispatch, userDelete.success]);

  const deleteHandler = (user) => (window.confirm('Are you sure?') ? dispatch(deleteUser(user._id)) : null);

  return { userList, userDelete, deleteHandler };
}
