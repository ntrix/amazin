import { memo } from 'react';
import { useOutline } from '../../useOutline';
import { useSuggestBox } from './useSuggestBox';
import { useKeyInput } from './useKeyInput';

function SearchInput({ input, setInput, setSuggests, submitHandler }) {
  const { inputRef, setOutline } = useOutline();
  const [showSuggestBox, hideSuggestBoxOnCallback] = useSuggestBox(setSuggests);
  const [handleKeyInput] = useKeyInput(setInput, setSuggests, submitHandler);
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
        onClick={() => showSuggestBox(input)}
        onFocus={() => {
          showSuggestBox(input);
          setOutline(true);
        }}
        onKeyUp={handleKeyInput}
        onChange={(e) => setInput(e.target.value)}
        onBlur={hideSuggestBoxOnCallback}
      ></input>
    </div>
  );
}
export default memo(SearchInput);
