import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { useDebounce } from './useDebounce';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');

  const { debounce, clearBounce } = useDebounce(_setShadowOf);
  const setShadowOf = useCallback((_sh) => {
    clearBounce();
    if (_sh !== shadowOf) _setShadowOf(_sh);
  }, []);

  const setShadowSlow = useCallback((_sh) => debounce(_sh), []);

  const value = { shadowOf, setShadowOf, setShadowSlow };
  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}

function useShadow(initialState) {
  const context = useContext(ShadowContext);
  if (context === undefined)
    throw new Error('useShadow must be used within a ShadowProvider');

  const { shadowOf, setShadowOf, setShadowSlow } = context;

  useEffect(() => {
    if (initialState !== undefined) setShadowOf(initialState);
  }, [initialState, setShadowOf]);

  return { shadowOf, setShadowOf, setShadowSlow };
}

export { ShadowProvider, useShadow };
