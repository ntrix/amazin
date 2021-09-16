import { useEffect, createContext, useContext, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { KEY } from 'src/constants';
import { pipe, Storage } from 'src/utils';

import { useDebounce } from './useDebounce';

type ShadowType = {
  userInfo: UserInfoType;
  currency: CurrType;
  shadowOf: string;
  setCurrency: SetState;
  setShadowOf: FnType;
  setShadowSlow: FnType;
};

const ShadowContext = createContext<ShadowType>({
  userInfo: { token: '' },
  currency: 'EUR',
  shadowOf: '',
  setCurrency: () => void 0,
  setShadowOf: () => void 0,
  setShadowSlow: () => void 0
});
ShadowContext.displayName = 'ShadowContext';

export function ShadowProvider({ children }: { children: Children }) {
  const { userInfo }: { userInfo: UserInfoType } = useSelector((state: AppState) => state.userSignin);
  const { sessionCurrency }: { sessionCurrency: CurrType } = useSelector((state: AppState) => state.currencyType);
  const [currency, setCurrency] = useState(userInfo?.currency ?? pipe.currency);

  useEffect(() => {
    pipe.setCurrency(userInfo?.currency || sessionCurrency || Storage[KEY.CURRENCY] || pipe.currency);
    setCurrency(pipe.currency);
  }, [userInfo?.currency, sessionCurrency]);

  const [shadowOf, _setShadowOf] = useState('');
  const [debounceShadow, clearDebounce] = useDebounce(_setShadowOf);

  const setShadowOf = useCallback((_sh) => {
    clearDebounce(_sh !== shadowOf && _sh); // eslint-disable-next-line
  }, []);

  const setShadowSlow = useCallback((_sh) => debounceShadow(_sh), [debounceShadow]);

  const value: ShadowType = { userInfo, currency, shadowOf, setCurrency, setShadowOf: setShadowOf, setShadowSlow };
  return <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>;
}

export function useShadow(): ShadowType {
  const context = useContext(ShadowContext);
  if (context === undefined) throw new Error('useShadow must be used within a ShadowProvider');

  return context;
}
