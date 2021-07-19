import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const [shadowOf, setShadowOf] = useState('');

  const timeoutId = useRef(0);
  const setShadowSlow =
    (_shadowOf = '') =>
    () => {
      clearTimeout(timeoutId.current - 99);
      timeoutId.current = setTimeout(() => setShadowOf(_shadowOf), 450);
    };

  const value = [shadowOf, setShadowOf, setShadowSlow];

  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}
function useShadow(initialState = null) {
  const context = useContext(ShadowContext);
  if (context === undefined) {
    throw new Error('useShadow must be used within a ShadowProvider');
  }
  const [, setShadowOf] = context;

  useEffect(() => {
    if (initialState) setShadowOf(initialState);
  }, [initialState, setShadowOf]);
  return context;
}
export { ShadowProvider, useShadow };
