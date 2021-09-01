import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { updateUserProfile } from 'src/apis/userAPI';
import { currencyTypeActions } from 'src/slice/ProductSlice';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { Storage, pipe } from 'src/utils';
import { KEY } from 'src/constants';

export function useCurrency() {
  const dispatch = useDispatch();
  const { cType } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);
  const [currency, setCurrency] = useState(cType || pipe.currency);
  const [newCurr, setNewCurr] = useState('');

  const CURR = `${pipe.symbol[currency]} - ${currency} - ${pipe.longName[currency]}`;
  const hist = Storage[KEY.HISTORY];
  const back = !hist || hist.startsWith('/currency') ? '/' : hist;

  useEffect(() => {
    setNewCurr('');
    setCurrency(cType || pipe.currency);
    if (!userInfo?._id) dispatch(userUpdateProfileActions._RESET());
  }, [cType, dispatch, userInfo?._id]);

  const submitChange = () => {
    Storage[KEY.CURRENCY] = currency;
    pipe.setCurrency(currency);
    dispatch(updateCurrencyRates());
    if (userInfo) dispatch(updateUserProfile({ userId: userInfo._id, currency }));
    dispatch(currencyTypeActions._CHANGE(currency));
    setNewCurr(currency);
  };

  return { CURR, back, currency, setCurrency, newCurr, submitChange };
}
