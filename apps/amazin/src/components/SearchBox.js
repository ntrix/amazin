import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { listAllProducts } from '../Controllers/productActions';

import { findSuggest } from '../utils';
import { ALL_CATEGORIES, MAX_SEARCH_SUGGESTS, SHADOW } from '../constants';
import { useShadow } from '../utils/useGlobal';

export function _SearchBox() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productList: list } = useSelector((state) => state.productListAll);
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );

  const { shadowOf, setShadowOf, clearShadow } = useShadow('');
  const [categoryScope, setCategoryScope] = useState(0);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [input, setInput] = useState('');
  const [suggests, setSuggests] = useState([]);
  const [showSuggest, setShowSuggest] = useState(0);
  const [outline, setOutline] = useState('');

  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    dispatch(
      listAllProducts({
        category: category === ALL_CATEGORIES ? '' : category,
        pageSize: 999
      })
    );
  }, [dispatch, category, success]);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (!e.target.value) return;
    // setShowSuggest(-1) for absorbing a keypress on submit instead setShowSuggest(0)
    setShowSuggest(-1);
    clearShadow();
    history.push(
      `/search/category/${
        category === ALL_CATEGORIES ? 'All' : category
      }/name/${input}`
    );
  };

  const handleClick = (e) => {
    if (!searchBoxRef.current.contains(e.target)) {
      setShowSuggest(0);
      setCategoryScope(0);
      clearShadow();
    }
    return e;
  };

  /* detect click outside component to close categories search scope window */
  useEffect(() => {
    if (SHADOW.SCOPE === shadowOf)
      document.addEventListener('mousedown', handleClick);
    if (SHADOW.NAV_DD === shadowOf) {
      document.removeEventListener('mousedown', handleClick);
      setCategoryScope(0);
    }
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }; // eslint-disable-next-line
  }, [categoryScope, shadowOf]);

  const showSuggestDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(list, input);
      if (newSuggests.length) {
        setSuggests(newSuggests);
        setShadowOf('searchBox');
        setShowSuggest(1);
      }
    }
    setCategoryScope(0);
  };

  return (
    <form
      ref={searchBoxRef}
      className={`search-box ${outline}`}
      onSubmit={submitHandler}
    >
      <div className="row--left">
        <div className="search__dropdown">
          <div
            className={`search-box__scope ${categoryScope ? 'focus' : ''}`}
            tabIndex="1"
            onClick={() => {
              setOutline('');
              setCategoryScope(categoryScope + 1);
              setShowSuggest(0);
              setShadowOf(SHADOW.SCOPE);
            }}
          >
            <div className="search-box__scope--facade">
              <span>{category}</span>
              <i className="fa fa-caret-down"></i>
            </div>
          </div>
        </div>

        {categoryScope & !!categories && (
          <div className="scope__windows">
            <ul className="scope__drop-list">
              {[ALL_CATEGORIES, ...categories].map((cat, i) => (
                <li
                  key={i}
                  className={`category ${cat === category ? 'selected' : ''}`}
                  onClick={() => {
                    if (cat === category) {
                      setCategoryScope(2);
                      setOutline('');
                      return;
                    }
                    setCategory(cat);
                    setCategoryScope(0);
                    searchInputRef.current.focus();
                    setShowSuggest(-1);
                    clearShadow();
                  }}
                  onBlur={() => setCategoryScope(0)}
                >
                  <i className="fa fa-check"></i> {cat}
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
            onClick={showSuggestDropdown}
            onFocus={() => {
              showSuggestDropdown();
              setOutline('focus');
            }}
            onKeyUp={(e) => {
              const { value } = e.target;
              if (value.length === 0 || e.key === 'Escape') {
                setShowSuggest(0);
                clearShadow();
                return;
              }
              if (e.key === 'Enter') {
                submitHandler();
                return;
              }
              setShowSuggest((showSuggest || 1) + 2);

              const newSuggests = findSuggest.search(list, value);
              if ('searchBox' !== shadowOf && newSuggests.length) {
                setShadowOf('searchBox');
                if (!outline) setOutline('focus');
              }
              setSuggests(newSuggests);
              setInput(value);
            }}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onBlur={() => {
              setOutline('');
              setShowSuggest(!!showSuggest & 1);
            }}
          ></input>
        </div>

        {shadowOf === 'searchBox' && showSuggest & !!input && (
          <div className="search__suggest">
            <ul>
              {suggests.slice(0, MAX_SEARCH_SUGGESTS).map((p, id) => (
                <li key={id}>
                  <Link
                    to={`/search/name/${p.name.replace(/(<b>)|(<\/b>)/g, '')}`}
                    dangerouslySetInnerHTML={{ __html: p.name }}
                    onClick={() => {
                      setShowSuggest(0);
                      setInput(p.name.replace(/(<b>)|(<\/b>)/g, ''));
                      setSuggests([]);
                      clearShadow();
                    }}
                  ></Link>
                </li>
              ))}
            </ul>
          </div>
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
