import { createContext, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const OutlineContext = createContext();
OutlineContext.displayName = 'OutlineContext';

export function OutlineProvider({ children }) {
  const { productList } = useSelector((state) => state.productListAll);
  const [outline, setOutline] = useState(false);
  const [scopeOutline, setScopeOutline] = useState(0);
  const [suggestBox, setSuggestBox] = useState(false);
  const inputRef = useRef(null);

  const value = {
    productList,
    inputRef,
    outline,
    setOutline,
    scopeOutline,
    setScopeOutline,
    suggestBox,
    setSuggestBox
  };

  return <OutlineContext.Provider value={value}>{children}</OutlineContext.Provider>;
}

export function useOutline() {
  const context = useContext(OutlineContext);
  if (context === undefined) throw new Error('useOutline must be used within a OutlineProvider');

  return context;
}
