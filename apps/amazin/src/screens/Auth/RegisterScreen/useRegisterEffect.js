import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register } from 'src/apis/userAPI';

export function useRegisterEffect(location, history) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userRegister = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userRegister.userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userRegister.userInfo]);

  const submitRegister = (e, { name, email, password, confirmPassword }) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmPassword));
  };

  return { redirect, userRegister, submitRegister };
}
