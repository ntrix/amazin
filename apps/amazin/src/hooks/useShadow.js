import { createContext, useContext, useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

export function ShadowProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');
  const [debounceShadow, clearDebounce] = useDebounce(_setShadowOf);
  const setShadowOf = useCallback(
    (_sh) => {
      clearDebounce();
      if (_sh !== shadowOf) _setShadowOf(_sh);
    },
    [_setShadowOf]
  );
  const setShadowSlow = useCallback((_sh) => debounceShadow(_sh), [debounceShadow]);
  const value = { shadowOf, setShadowOf, setShadowSlow };
  return <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>;
}
export function useShadow() {
  const context = useContext(ShadowContext);
  if (context === undefined) throw new Error('useShadow must be used within a ShadowProvider');
  return context;
}
