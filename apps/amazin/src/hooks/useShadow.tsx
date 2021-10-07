import { useEffect, createContext, useContext, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { KEY, ShadowType } from 'src/constants';
import { pipe, Storage } from 'src/utils';

import { useDebounce } from './useDebounce';

export type ShadowContextType = {
  userInfo: UserInfoType;
  currency: CurrType;
  shadowOf: ShadowType;
  setCurrency: SetStateType<CurrType>;
  setShadowOf: FnType;
  setShadowSlow: FnType;
};

const ShadowContext = createContext<ShadowContextType | undefined>(undefined);
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }: { children: Children }) {
  const { userInfo }: { userInfo: UserInfoType } = useSelector((state: AppState) => state.userSignin);
  const { sessionCurrency }: { sessionCurrency: CurrType } = useSelector((state: AppState) => state.currencyType);

  const [currency, setCurrency] = useState(userInfo?.currency ?? pipe.currency);

  useEffect(() => {
    pipe.setCurrency(userInfo?.currency || sessionCurrency || Storage[KEY.CURRENCY] || pipe.currency);
    setCurrency(pipe.currency);
  }, [userInfo?.currency, sessionCurrency]);

  const [shadowOf, _setShadowOf] = useState<ShadowType>('');
  const [debounceShadow, clearDebounce] = useDebounce(_setShadowOf);

  const { current: setShadowOf } = useRef((shadow: ShadowType) => {
    clearDebounce(shadow !== shadowOf && shadow);
  });

  const setShadowSlow = useCallback((shadow) => debounceShadow(shadow), [debounceShadow]);

  const value: ShadowContextType = {
    userInfo,
    currency,
    shadowOf,
    setCurrency,
    setShadowOf,
    setShadowSlow
  };
  return <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>;
}

export function useShadow(): ShadowContextType {
  const context = useContext(ShadowContext);
  if (context === undefined) throw new Error('useShadow must be used within a ShadowProvider');

  return context;
}

export default ShadowProvider;
