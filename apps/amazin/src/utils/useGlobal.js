import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

const GlobalContext = createContext();
GlobalContext.displayName = 'GlobalContext';

function GlobalVarProvider({ children }) {
  const [shadowOf, setShadowOf] = useState('');

  const timeoutId = useRef(0);
  const setShadowSlow =
    (_shadowOf = '') =>
    () => {
      clearTimeout(timeoutId.current - 99);
      timeoutId.current = setTimeout(() => setShadowOf(_shadowOf), 450);
    };

  const clearShadow = () => setShadowOf('');

  const value = { shadowOf, setShadowOf, setShadowSlow, clearShadow };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

function useShadow(initialState = null) {
  const context = useContext(GlobalContext);
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
  const context = useContext(GlobalContext);
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
