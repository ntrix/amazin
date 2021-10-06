import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUser } from 'src/apis/userAPI';
import { userUpdateActions } from 'src/slice/UserSlice';

export type SetStates = {
  setName: SetStateType<string>;
  setEmail: SetStateType<string>;
  setIsSeller: SetStateType<boolean | undefined>;
  setIsAdmin: SetStateType<boolean | undefined>;
};

export function useUserSubmit(history: HistoryProp, match: MatchProp) {
  const dispatch = useDispatch();
  const paramUserId = match.params.id;
  const userUpdate: StatusType = useSelector((state: AppState) => state.userUpdate);

  useEffect(() => {
    if (!userUpdate.success) return;
    dispatch(userUpdateActions._RESET(''));
    history.push('/user-list');
  }, [userUpdate.success, history, dispatch]);

  const submitUser = (name: string, email: string, isSeller?: boolean, isAdmin?: boolean) => (e: EventType) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isSeller, isAdmin, _id: paramUserId }));
  };

  return { userUpdate, submitUser };
}

export function useUserEdit({ setName, setEmail, setIsSeller, setIsAdmin }: SetStates, match: MatchProp) {
  const dispatch = useDispatch();
  const { user, loading, error }: UserDetailType = useSelector((state: AppState) => state.userDetails);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    } else dispatch(detailsUser(match.params.id));
  }, [user, match.params.id, dispatch, setName, setEmail, setIsSeller, setIsAdmin]);

  return { user, loading, error };
}
