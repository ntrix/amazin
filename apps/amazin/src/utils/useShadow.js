import React, {
  useRef,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { debounce } from '.';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');

  const setShadowOf = (_sh) => (_sh !== shadowOf ? _setShadowOf(_sh) : null);

  const { current } = useRef(debounce(setShadowOf, 500));
  const setShadowSlow = (_sh) => () => current(_sh);

  const clearShadow = () => setShadowOf('');

  const value = { shadowOf, setShadowOf, setShadowSlow, clearShadow };
  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}

function useShadow(initialState = '') {
  const context = useContext(ShadowContext);
  if (context === undefined)
    throw new Error('useShadow must be used within a ShadowProvider');

  const { shadowOf, setShadowOf, setShadowSlow, clearShadow } = context;

  useEffect(() => {
    if (initialState) setShadowOf(initialState);
  }, [initialState, setShadowOf]);

  return { shadowOf, setShadowOf, setShadowSlow, clearShadow };
}

export { ShadowProvider, useShadow };
