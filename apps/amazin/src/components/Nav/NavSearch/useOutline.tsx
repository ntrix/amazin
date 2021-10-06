import { createContext, useContext, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Scope } from 'src/constants';

export type OutlineCtxType = {
  productList: { name: string }[];
  suggests: { name: string }[];
  setSuggests: SetStateType<{ name: string }[]>;
  activeSuggest: number;
  setActiveSuggest: SetStateType<number>;
  inputRef: Ref<HTMLInputElement>;
  outline: boolean;
  setOutline: SetStateType<boolean>;
  scopeOutline: Scope;
  setScopeOutline: SetStateType<Scope>;
  suggestBox: boolean;
  setSuggestBox: SetStateType<boolean>;
};

const OutlineContext = createContext<OutlineCtxType | undefined>(undefined);
OutlineContext.displayName = 'OutlineContext';

function OutlineProvider({ children }: { children: Children }) {
  const { productList } = useSelector((state: AppState) => state.productListAll);
  const [suggests, setSuggests] = useState<{ name: string }[]>([]);
  const [activeSuggest, setActiveSuggest] = useState(-1);
  const [outline, setOutline] = useState(false);
  const [scopeOutline, setScopeOutline] = useState(Scope.hide);
  const [suggestBox, setSuggestBox] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const value: OutlineCtxType = {
    productList,
    suggests,
    setSuggests,
    activeSuggest,
    setActiveSuggest,
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
