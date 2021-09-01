import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { signin, updateUserProfile } from 'src/apis/userAPI';
import { pipe } from 'src/utils';

export function useSigninEffect(location, history) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      dispatch(updateCurrencyRates());
      if (userInfo.currency) pipe.setCurrency(userInfo.currency);
      else
        dispatch(
          updateUserProfile({
            userId: userInfo._id,
            currency: pipe.currency
          })
        );
      history.push(redirect);
    }
  }, [dispatch, history, redirect, userInfo]);

  const submitSignin = (e, { email, password }) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return { redirect, userSignin, submitSignin };
}
