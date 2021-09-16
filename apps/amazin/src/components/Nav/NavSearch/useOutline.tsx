import { createContext, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scope } from 'src/constants';

type OutlineCtxType = {
  productList: PNameType[];
  inputRef: Ref<HTMLElement>;
  outline: boolean;
  setOutline: SetState;
  scopeOutline: Scope;
  setScopeOutline: SetState;
  suggestBox: boolean;
  setSuggestBox: SetState;
};

const OutlineContext = createContext<OutlineCtxType>({
  productList: [],
  inputRef: undefined,
  outline: false,
  setOutline: () => void 0,
  scopeOutline: Scope.hide,
  setScopeOutline: () => void 0,
  suggestBox: false,
  setSuggestBox: () => void 0
});
OutlineContext.displayName = 'OutlineContext';

export function OutlineProvider({ children }) {
  const { productList } = useSelector((state: AppState) => state.productListAll);
  const [outline, setOutline] = useState(false);
  const [scopeOutline, setScopeOutline] = useState(Scope.hide);
  const [suggestBox, setSuggestBox] = useState(false);
  const inputRef = useRef<HTMLElement>();

  const value: OutlineCtxType = {
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
