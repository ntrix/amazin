import React, { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from './index';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function GlobalVarProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');

  const setShadowOf = (val) => {
    if (val !== shadowOf) _setShadowOf(val);
  };

  const setShadowSlow =
    (_shadowOf = '') =>
    () =>
      debounce(setShadowOf, 500)(_shadowOf);

  const clearShadow = () => setShadowOf('');

  const value = { shadowOf, setShadowOf, setShadowSlow, clearShadow };
  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}

function useShadow(initialState = null) {
  const context = useContext(ShadowContext);
  if (context === undefined)
    throw new Error('useShadow must be used within a GlobalVarProvider');

  const { shadowOf, setShadowOf, setShadowSlow, clearShadow } = context;

  useEffect(() => {
    if (initialState) setShadowOf(initialState);
  }, [initialState, setShadowOf]);

  return { shadowOf, setShadowOf, setShadowSlow, clearShadow };
}

/* TODO

.function useCurrency(initialState = null) {
  const context = useContext(ShadowContext);
  if (context === undefined)
    throw new Error('useCurrency must be used within a GlobalVarProvider');

  const { currency, setCurrency } = context;

  useEffect(() => {
    if (initialState) setCurrency(initialState);
  }, [initialState, setCurrency]);

  return [currency, setCurrency];
}
*/

export { GlobalVarProvider, useShadow };
