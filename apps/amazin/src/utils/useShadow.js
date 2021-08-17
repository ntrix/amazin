import React, {
  createContext,
  useRef,
  useContext,
  useEffect,
  useState
} from 'react';
import { useDebounce } from './useDebounce';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');

  const { debounce, clearBounce } = useDebounce(_setShadowOf);
  const { current: setShadowOf } = useRef((_sh) => {
    clearBounce();
    if (_sh !== shadowOf) _setShadowOf(_sh);
  });

  const setShadowSlow = (_sh) => () => debounce(_sh);

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
