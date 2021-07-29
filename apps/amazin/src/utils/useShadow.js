import React, {
  useRef,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

const ShadowContext = createContext();
ShadowContext.displayName = 'ShadowContext';

function ShadowProvider({ children }) {
  const [shadowOf, _setShadowOf] = useState('');

  const setShadowOf = (val) => {
    ids.current.forEach((id) => clearTimeout(id));
    ids.current.length = 0;
    if (val !== shadowOf) _setShadowOf(val);
  };

  const ids = useRef([]);
  const setShadowSlow =
    (_shadowOf = '') =>
    () => {
      ids.current.push(
        setTimeout(() => {
          setShadowOf(_shadowOf);
        }, 500)
      );
      if (_shadowOf === shadowOf) {
        ids.current.forEach((id) => clearTimeout(id));
        ids.current.length = 0;
      }
    };

  const clearShadow = () => setShadowOf('');

  const value = { shadowOf, setShadowOf, setShadowSlow, clearShadow };
  return (
    <ShadowContext.Provider value={value}>{children}</ShadowContext.Provider>
  );
}

function useShadow(initialState = null) {
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
