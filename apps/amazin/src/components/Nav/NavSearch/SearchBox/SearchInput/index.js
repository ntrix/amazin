import { memo } from 'react';

import { useOutline } from '../../useOutline';
import { useSuggestBox } from './useSuggestBox';
import { useKeyInput } from './useKeyInput';

function SearchInput({ input, setInput, setSuggests, submitSearch }) {
  const { inputRef, setOutline } = useOutline();
  const { showBox, hideBoxOnCallback } = useSuggestBox(setSuggests);
  const { handleKeyInput } = useKeyInput(setInput, setSuggests, submitSearch);

  const onClickOrFocus = () => {
    showBox(input);
    setOutline(true);
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
        onClick={onClickOrFocus}
        onFocus={onClickOrFocus}
        onKeyUp={handleKeyInput}
        onChange={(e) => setInput(e.target.value)}
        onBlur={hideBoxOnCallback}
      ></input>
    </div>
  );
}

export default memo(SearchInput, (prev, next) => prev.input === next.input);
