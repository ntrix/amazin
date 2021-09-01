import { useUserList } from './useUserList';
import Table from '../../Product/ProductListScreen/Table';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

export default function UserListScreen() {
  const { userList, userDelete, deleteHandler } = useUserList();

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
