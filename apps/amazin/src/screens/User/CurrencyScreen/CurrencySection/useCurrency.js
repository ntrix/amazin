import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { updateCurrencyRates } from 'src/apis/productAPI';
import { updateUserProfile } from 'src/apis/userAPI';
import { currencyTypeActions } from 'src/slice/ProductSlice';
import { userUpdateProfileActions } from 'src/slice/UserSlice';
import { useShadow } from 'src/hooks/useShadow';
import { Storage, pipe } from 'src/utils';
import { KEY } from 'src/constants';

export function useCurrency() {
  const dispatch = useDispatch();
  const { cType: paramCurrency } = useParams();
  const { userInfo } = useShadow();
  const [currency, setCurrency] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  const CURR = `${pipe.symbol[currency]} - ${currency} - ${pipe.longName[currency]}`;
  const hist = Storage[KEY.HISTORY];
  const back = !hist || hist.startsWith('/currency') ? '/' : hist;

  useEffect(() => {
    setIsChanged(false);
    setCurrency(paramCurrency || pipe.currency);
    if (!userInfo?._id) dispatch(userUpdateProfileActions._RESET());
  }, [userInfo?._id, paramCurrency, dispatch]);

  const submitChange = () => {
    Storage[KEY.CURRENCY] = currency;
    pipe.setCurrency(currency);
    dispatch(updateCurrencyRates());
    if (userInfo) dispatch(updateUserProfile({ userId: userInfo._id, currency }));
    dispatch(currencyTypeActions._CHANGE(currency));
    setIsChanged(true);
  };

  return { CURR, back, currency, setCurrency, isChanged, submitChange };
}
