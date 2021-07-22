import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { listAllProducts } from '../../../Controllers/productActions';

import { findSuggest } from '../../../utils';
import { NAV, SHADOW } from '../../../constants';
import { useShadow } from '../../../utils/useGlobal';
import SearchSuggest from './SearchSuggest';

export function _SearchBox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productList: list } = useSelector((state) => state.productListAll);
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );

  const { shadowOf, setShadowOf, clearShadow } = useShadow('');

  const [searchBoxOutline, setSearchBoxOutline] = useState(false);
  const [scopeOutline, _setScopeOutline] = useState(0);
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);
  const [suggestWindow, setSuggestWindow] = useState(false);

  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  const setScopeOutline = (state) => {
    console.log(state);
    return _setScopeOutline(state);
  };
  const getCatLabel = (cat) => (cat === NAV.ALL ? NAV.ALL_CATEGORIES : cat);

  useEffect(() => {
    dispatch(listAllProducts({ category: activeCat }));
  }, [dispatch, activeCat, success]);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (e?.target?.value === '') return;

    setSuggestWindow(false);
    clearShadow();
    history.push(`/search/category/${activeCat}/name/${input}`);
  };

  const handleClick = useCallback(
    (e) => {
      if (!searchBoxRef.current.contains(e.target)) {
        setSuggestWindow(false);
        setScopeOutline(0);
        clearShadow();
      }
      return e;
    },
    [searchBoxRef, clearShadow]
  );

  /* detect click outside component to close categories search scope window */
  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf)
      document.addEventListener('mousedown', handleClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleClick);
      setScopeOutline(0);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [scopeOutline, shadowOf, handleClick]);

  const suggestWindowDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(list, input);
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
    if (!suggestWindow) setSuggestWindow(true);

    const newSuggests = findSuggest.search(list, value);
    if (SHADOW.SEARCH_BOX !== shadowOf && newSuggests.length) {
      setShadowOf(SHADOW.SEARCH_BOX);
      if (!searchBoxOutline) setSearchBoxOutline(true);
    }
    setSuggests(newSuggests);
    setInput(value);
  };

  const handleClickThenDismiss = () => () => {
    setSearchBoxOutline(false);
    setSuggestWindow(!suggestWindow);
  };

  return (
    <form
      ref={searchBoxRef}
      className={`search-box ${searchBoxOutline ? 'focus' : ''}`}
      onSubmit={submitHandler}
    >
      <div className="row--left">
        <div className="search-box__cat-scope">
          <div
            className={`cat-scope ${scopeOutline ? 'focus' : ''}`}
            tabIndex="1"
            onClick={() => {
              setSearchBoxOutline(false);
              setScopeOutline(1 - scopeOutline);
              setSuggestWindow(false);
              setShadowOf(SHADOW.SCOPE);
            }}
          >
            <div className="cat-scope--facade">
              <span>{getCatLabel(activeCat)}</span>
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
        </div>

        {scopeOutline > 0 && !!categories && (
          <div className="cat-scope__dropdown">
            <ul className="dropdown__list">
              {[NAV.ALL, ...categories].map((cat, i) => (
                <li
                  key={i}
                  className={`category ${cat === activeCat ? 'selected' : ''}`}
                  onClick={() => {
                    if (cat === activeCat) {
                      setScopeOutline(-1);
                      setSearchBoxOutline(false);
                      return;
                    }
                    setActiveCat(cat);
                    setScopeOutline(0);
                    searchInputRef.current.focus();
                    setSuggestWindow(false);
                    clearShadow();
                  }}
                  onBlur={() => setScopeOutline(0)}
                >
                  <i className="fa fa-check"></i> {getCatLabel(cat)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="row--fill">
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
            onBlur={handleClickThenDismiss}
          ></input>
        </div>

        {SHADOW.SEARCH_BOX === shadowOf && suggestWindow && !!input && (
          <SearchSuggest
            hook={{ suggests, setSuggests, setInput, setSuggestWindow }}
          />
        )}
      </div>

      <div className="row--right">
        <div className="search__btn">
          <span className="sprite__search-btn" tabIndex="3" aria-label="Go">
            <input type="submit" value="Go"></input>
          </span>
        </div>
      </div>
    </form>
  );
}

const SearchBox = React.memo(_SearchBox);
export default SearchBox;
