import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, listUsers } from 'src/apis/userAPI';
import { userDetailsActions } from 'src/slice/UserSlice';

export function useUserList() {
  const dispatch = useDispatch();
  const userList: UserListType = useSelector((state: AppState) => state.userList);
  const userDelete: StatusType = useSelector((state: AppState) => state.userDelete);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(userDetailsActions._RESET(''));
  }, [dispatch, userDelete.success]);

  const deleteHandler = (user: UserType) => window.confirm('Are you sure?') && dispatch(deleteUser(user._id));

  return { userList, userDelete, deleteHandler };
}
