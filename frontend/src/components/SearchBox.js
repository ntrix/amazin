import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";

import { findSuggest } from "../utils";
import { ALL_CATEGORIES, MAX_SEARCH_SUGGESTS } from "../constants";

export default function SearchBox({ shadowFor, setShadowFor }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productList: list } = useSelector((state) => state.productListAll);
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );

  const [navScope, setNavScope] = useState(0);
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [input, setInput] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [showSuggest, setShowSuggest] = useState(0);
  const [outline, setOutline] = useState("");

  const searchBoxRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    dispatch(
      listAllProducts({
        category: category === ALL_CATEGORIES ? "" : category,
        pageSize: 999,
      })
    );
  }, [dispatch, category, success]);

  const submitHandler = (e) => {
    e?.preventDefault();
    if (!e.target.value) return;
    // setShowSuggest(-1) for absorbing a keypress on submit instead setShowSuggest(0)
    setShowSuggest(-1);
    setShadowFor("");
    history.push(
      `/search/category/${
        category === ALL_CATEGORIES ? "All" : category
      }/name/${input}`
    );
  };

  const handleClick = (e) => {
    if (!searchBoxRef.current.contains(e.target)) {
      setShowSuggest(0);
      setNavScope(0);
      setShadowFor("");
    }
    return e;
  };

  /* detect click outside component to close categories search scope window */
  useEffect(() => {
    if ("scope" === shadowFor)
      document.addEventListener("mousedown", handleClick);
    if ("navDrop" === shadowFor) {
      document.removeEventListener("mousedown", handleClick);
      setNavScope(0);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }; // eslint-disable-next-line
  }, [navScope, shadowFor]);

  const showSuggestDropdown = () => {
    if (input) {
      const newSuggests = findSuggest.search(list, input);
      if (newSuggests.length) {
        setSuggests(newSuggests);
        setShadowFor("searchBox");
        setShowSuggest(1);
      }
    }
    setNavScope(0);
  };

  return (
    <>
      <form
        ref={searchBoxRef}
        className={"search-box " + outline}
        onSubmit={submitHandler}
      >
        <div className="row--left">
          <div className="search__dropdown">
            <div
              className={["focus ", ""][!navScope & 1] + "search-box__scope"}
              tabIndex="1"
              onClick={() => {
                setOutline("");
                setNavScope(navScope + 1);
                setShowSuggest(0);
                setShadowFor("scope");
              }}
            >
              <div className="search-box__scope--facade">
                <span>{category}</span>
                <i className="fa fa-caret-down"></i>
              </div>
            </div>
          </div>

          {navScope & !!categories && (
            <div className="scope__windows">
              <ul className="scope__drop-list">
                {[ALL_CATEGORIES, ...categories].map((cat, i) => (
                  <li
                    key={i}
                    className={
                      ["selected ", ""][(cat !== category) & 1] + "category"
                    }
                    onClick={() => {
                      if (cat === category) {
                        setNavScope(2);
                        setOutline("");
                        return;
                      }
                      setCategory(cat);
                      setNavScope(0);
                      searchInputRef.current.focus();
                      setShowSuggest(-1);
                      setShadowFor("");
                    }}
                    onBlur={() => setNavScope(0)}
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
                setOutline("focus");
              }}
              onKeyUp={(e) => {
                const { value } = e.target;
                if (value.length === 0 || e.key === "Escape") {
                  setShowSuggest(0);
                  setShadowFor("");
                  return;
                }
                if (e.key === "Enter") {
                  submitHandler();
                  return;
                }
                setShowSuggest((showSuggest || 1) + 2);

                const newSuggests = findSuggest.search(list, value);
                if ("searchBox" !== shadowFor && newSuggests.length) {
                  setShadowFor("searchBox");
                  if (!outline) setOutline("focus");
                }
                setSuggests(newSuggests);
                setInput(value);
              }}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onBlur={() => {
                setOutline("");
                setShowSuggest(!!showSuggest & 1);
              }}
            ></input>
          </div>

          {shadowFor === "searchBox" && showSuggest & !!input && (
            <div className="search__suggest">
              <ul>
                {suggests.slice(0, MAX_SEARCH_SUGGESTS).map((p, id) => (
                  <li key={id}>
                    <Link
                      to={`/search/name/${p.name.replace(
                        /(<b>)|(<\/b>)/g,
                        ""
                      )}`}
                      dangerouslySetInnerHTML={{ __html: p.name }}
                      onClick={() => {
                        setShowSuggest(0);
                        setInput(p.name.replace(/(<b>)|(<\/b>)/g, ""));
                        setSuggests([]);
                        setShadowFor("");
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
    </>
  );
}
