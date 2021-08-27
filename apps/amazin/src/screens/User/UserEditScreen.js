import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userUpdateActions } from '../../slice/UserSlice';
import { detailsUser, updateUser } from '../../apis/userAPI';

import CustomInput from '../../components/CustomInput';
import LoadingOrError from '../../components/LoadingOrError';
import Button from '../../components/Button';

export default function UserEditScreen({ history, match }) {
  const dispatch = useDispatch();
  const userId = match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userUpdate.success) {
      dispatch(userUpdateActions._RESET());
      history.push('/user-list');
    }
    if (!user) {
      dispatch(detailsUser(userId));
      return;
    }
    setName(user.name);
    setEmail(user.email);
    setIsSeller(user.isSeller);
    setIsAdmin(user.isAdmin);
  }, [dispatch, history, userUpdate.success, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>

          <LoadingOrError xl statusOf={userDetails} />
          <LoadingOrError xl statusOf={userUpdate} />
        </div>

        {userDetails?.success && (
          <>
            <CustomInput text="Name" hook={[name, setName]} />

            <CustomInput text="Email" type="email" hook={[email, setEmail]} />

            <CustomInput
              wrapClass="flex"
              text="Seller Account"
              type="checkbox"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
            />

            <CustomInput
              wrapClass="flex"
              text="Administrator"
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <div>
              <Button primary type="submit" label="Update" />
            </div>
          </>
        )}
      </form>
    </div>
  );
}
