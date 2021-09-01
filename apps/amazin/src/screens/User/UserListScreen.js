import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, listUsers } from 'src/apis/userAPI';
import { userDetailsActions } from 'src/slice/UserSlice';
import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
import Table from '../Product/ProductListScreen/Table';

export default function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userDelete = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(userDetailsActions._RESET());
  }, [dispatch, userDelete.success]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1 className="p-1">Users</h1>
      <LoadingOrError xl statusOf={userDelete} />
      <MessageBox variant="success" show={userDelete.success}>
        User Deleted Successfully
      </MessageBox>
      <LoadingOrError xl statusOf={userList} />

      {userList?.success && (
        <Table
          header={['USER_ID', 'NAME', 'EMAIL', 'SELLER', 'ADMIN']}
          keys={['_id', 'name', 'email', 'isSeller', 'isAdmin']}
          data={userList.users}
          deleteHandler={deleteHandler}
          createBtn={(user) => <Button xs label="Edit" to={`/user/${user._id}/edit`} />}
        />
      )}
    </div>
  );
}
