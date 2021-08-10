import React from 'react';
import { useSelector } from 'react-redux';

import { SHADOW } from '../../../constants';
import { findSuggest } from '../../../utils';
import { useShadow } from '../../../utils/useGlobal';

export function _SearchInput({
  hook: [input, setInput],
  submitHandler,
  share: {
    searchInputRef,
    setScopeOutline,
    setSearchBoxOutline,
    setSuggests,
    setSuggestWindow
  }
}) {
  const { productList } = useSelector((state) => state.productListAll);

  const { shadowOf, setShadowOf, clearShadow } = useShadow('');

  const suggestWindowDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(productList, input);
      if (newSuggests.length) {
        setSuggests(newSuggests);
        setShadowOf(SHADOW.SEARCH_BOX);
        setSuggestWindow(true);
      }
    }
    setScopeOutline(0);
  };

  const handleKeyInput = (e) => {
    const { value } = e.target;
    if (value.length === 0 || e.key === 'Escape') {
      setSuggestWindow(false);
      clearShadow();
      return;
    }
    if (e.key === 'Enter') {
      submitHandler();
      return;
    }
    setSuggestWindow(true);

    const newSuggests = findSuggest.search(productList, value);
    if (SHADOW.SEARCH_BOX !== shadowOf && newSuggests.length) {
      setShadowOf(SHADOW.SEARCH_BOX);
      setSearchBoxOutline(true);
    }
    setSuggests(newSuggests);
    setInput(value);
  };

  const handleEventBeforeDismiss = () => () => {
    setSearchBoxOutline(false);
    setSuggestWindow(false);
  };

  return (
    <div className="search__input">
      <input
        type="text"
        ref={searchInputRef}
        id="q"
        name="q"
        autoComplete="off"
        value={input}
        size="1"
        tabIndex="2"
        aria-label="search input"
        onClick={suggestWindowDropdown}
        onFocus={() => {
          suggestWindowDropdown();
          setSearchBoxOutline(true);
        }}
        onKeyUp={handleKeyInput}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onBlur={handleEventBeforeDismiss}
      ></input>
    </div>
  );
}

const SearchInput = React.memo(_SearchInput);
export default SearchInput;
