import React from 'react';
import { useSelector } from 'react-redux';

import { useOutline } from '../../../hooks/useOutline';
import { useShadow } from '../../../hooks/useShadow';
import { SHADOW } from '../../../constants';
import { findSuggest } from '../../../utils';

export function _SearchInput({ input, control: { setInput, setSuggests, submitHandler } }) {
  const { productList } = useSelector((state) => state.productListAll);
  const { inputRef, suggestBox, setOutline, setScopeOutline, setSuggestBox } = useOutline();
  const { shadowOf, setShadowOf } = useShadow();

  const SuggestBoxDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(productList, input);
      if (newSuggests.length) {
        setSuggests(newSuggests);
        setShadowOf(SHADOW.NAV_SEARCH);
        setSuggestBox(true);
      }
    }
    setScopeOutline(0);
  };

  const handleKeyInput = (e) => {
    const { value } = e.target;
    if (value.length === 0 || e.key === 'Escape') {
      setSuggestBox(false);
      setShadowOf('');
      return;
    }
    if (e.key === 'Enter') {
      submitHandler();
      return;
    }
    setSuggestBox(true);

    const newSuggests = findSuggest.search(productList, value);
    if (SHADOW.NAV_SEARCH !== shadowOf && newSuggests.length) {
      setShadowOf(SHADOW.NAV_SEARCH);
      setOutline(true);
    }
    setSuggests(newSuggests);
    setInput(value);
  };

  const hideSuggestBoxOnCallback = () => {
    setOutline(false);
    // Wait to execute any click on Suggest Box, closes on callback
    return suggestBox ? () => setSuggestBox(false) : null;
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
        tabIndex="1"
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
        onBlur={hideSuggestBoxOnCallback}
      ></input>
    </div>
  );
}

const SearchInput = React.memo(_SearchInput);
export default SearchInput;
