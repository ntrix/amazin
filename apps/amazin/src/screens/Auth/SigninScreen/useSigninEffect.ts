import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { signin, updateUserProfile } from 'src/apis/userAPI';
import { pipe } from 'src/utils';

export function useSigninEffect(location: LocationProp, history: HistoryProp) {
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userSignin = useSelector((state: AppState) => state.userSignin);
  const { userInfo }: { userInfo: UserType } = userSignin;

  useEffect(() => {
    if (userInfo) {
      dispatch(updateCurrencyRates());
      if (userInfo.currency) pipe.setCurrency(userInfo.currency);
      else
        dispatch(
          updateUserProfile({
            _id: userInfo._id,
            currency: pipe.currency
          })
        );
      history.push(redirect);
    }
  }, [dispatch, history, redirect, userInfo]);

  const submitSignin = (e: EventType, { email, password }: Record<string, string>) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return { redirect, userSignin, submitSignin };
}
