import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userDetailsActions } from "./UserSlice";
import { deleteUser, listUsers } from "../../Controllers/userActions";

import MessageBox from "../../components/MessageBox";
import LoadingOrError from "../../components/LoadingOrError";

export default function UserListScreen({ history }) {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const userDelete = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(listUsers());
    dispatch(userDetailsActions._RESET());
  }, [dispatch, userDelete.success]);
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
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

      {userList.success && (
        <table className="table">
          <thead>
            <tr>
              <th>USER_ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SELLER</th>
              <th>ADMIN</th>
              <th className="tab__w12">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {userList.users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td className="text-center success">
                  {user.isSeller && (
                    <i className="fa fa-check" aria-hidden="true"></i>
                  )}
                </td>

                <td className="text-center success">
                  {user.isAdmin && (
                    <i className="fa fa-check" aria-hidden="true"></i>
                  )}
                </td>

                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="small danger"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
