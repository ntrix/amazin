import React from 'react';
import { useSelector } from 'react-redux';

import { useOutline } from './useOutline';
import { useShadow } from '../../../utils/useShadow';
import { SHADOW } from '../../../constants';
import { findSuggest } from '../../../utils';

export function _SearchInput({
  input,
  control: { setInput, setSuggests, submitHandler }
}) {
  const { productList } = useSelector((state) => state.productListAll);
  const { inputRef, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { shadowOf, setShadowOf, clearShadow } = useShadow('');

  const SuggestBoxDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(productList, input);
      if (newSuggests.length) {
        setSuggests(newSuggests);
        setShadowOf(SHADOW.SEARCH_BOX);
        setSuggestBox(true);
      }
    }
    setScopeOutline(0);
  };

  const handleKeyInput = (e) => {
    const { value } = e.target;
    if (value.length === 0 || e.key === 'Escape') {
      setSuggestBox(false);
      clearShadow();
      return;
    }
    if (e.key === 'Enter') {
      submitHandler();
      return;
    }
    setSuggestBox(true);

    const newSuggests = findSuggest.search(productList, value);
    if (SHADOW.SEARCH_BOX !== shadowOf && newSuggests.length) {
      setShadowOf(SHADOW.SEARCH_BOX);
      setOutline(true);
    }
    setSuggests(newSuggests);
    setInput(value);
  };

  const hideOnCallback = () => () => {
    setOutline(false);
    setSuggestBox(false);
  };

  return (
    <div className="search__input">
      <input
        type="text"
        ref={inputRef}
        id="q"
        name="q"
        autoComplete="off"
        value={input}
        size="1"
        tabindex="1"
        aria-label="search input"
        onClick={SuggestBoxDropdown}
        onFocus={() => {
          SuggestBoxDropdown();
          setOutline(true);
        }}
        onKeyUp={handleKeyInput}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onBlur={hideOnCallback}
      ></input>
    </div>
  );
}

const SearchInput = React.memo(_SearchInput);
export default SearchInput;
