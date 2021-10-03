import { createContext, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scope } from 'src/constants';

type OutlineCtxType = {
  productList: { name: string }[];
  inputRef: Ref<HTMLInputElement>;
  outline: boolean;
  setOutline: SetStateType<boolean>;
  scopeOutline: Scope;
  setScopeOutline: SetStateType<Scope>;
  suggestBox: boolean;
  setSuggestBox: SetStateType<boolean>;
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

function OutlineProvider({ children }: { children: Children }) {
  const { productList } = useSelector((state: AppState) => state.productListAll);
  const [outline, setOutline] = useState(false);
  const [scopeOutline, setScopeOutline] = useState(Scope.hide);
  const [suggestBox, setSuggestBox] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

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

export default OutlineProvider;
