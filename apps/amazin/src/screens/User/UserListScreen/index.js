import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, listUsers } from 'src/apis/userAPI';
import { userDetailsActions } from 'src/slice/UserSlice';
import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
import Table from '../../Product/ProductListScreen/Table';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userDelete = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(userDetailsActions._RESET());
  }, [dispatch, userDelete.success]);

  const deleteHandler = (user) => (window.confirm('Are you sure?') ? dispatch(deleteUser(user._id)) : null);

  return (
    <div>
      <h1 className="p-1">Users</h1>
      <LoadingOrError xl statusOf={userList} />
      <LoadingOrError statusOf={userDelete} />
      <MessageBox variant="success" show={userDelete.success} children="User Deleted Successfully" />

      {userList?.success && (
        <Table
          header={['USER_ID', 'NAME', 'EMAIL', 'SELLER', 'ADMIN']}
          keys={['_id', 'name', 'email', 'isSeller', 'isAdmin']}
          data={userList.users}
          deleteHandler={deleteHandler}
          to="/user/"
        />
      )}
    </div>
  );
}
