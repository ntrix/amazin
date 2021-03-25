import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";
import { findSuggest } from "../utils";

export default function SearchBox({ shadowFor, setShadowFor }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productList: list } = useSelector((state) => state.productListAll);
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  const [navScope, setNavScope] = useState(0);
  const [category, setCategory] = useState("All Categories");

  const [input, setInput] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [suggestBox, setSuggestBox] = useState(0);
  const [outline, setOutline] = useState("");

  const submitHandler = (e) => {
    e?.preventDefault();
    if (!e.target.value) return;
    setSuggestBox(-1); //for absorbing a keypress on submit instead setSuggestBox(0)
    setShadowFor("");
    history.push(
      `/search/category/${
        category === "All Categories" ? "All" : category
      }/name/${input}`
    );
  };

  const handleClick = (e) => {
    if (!boxRef.current.contains(e.target)) {
      setSuggestBox(0);
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
    };
  }, [navScope % 2, shadowFor]);

  useEffect(() => {
    dispatch(
      listAllProducts({
        category: category === "All Categories" ? "" : category,
        pageSize: 999,
      })
    );
  }, [dispatch, category, success]);

  return (
    <>
      <form
        ref={boxRef}
        className={"search-box " + outline}
        onSubmit={submitHandler}
      >
        <div className="row--left">
          <div className="search__dropdown">
            <div
              className={(navScope > 0 ? "focus " : "") + " search-box__scope"}
              tabIndex="1"
              onClick={() => {
                setOutline("");
                setNavScope(navScope + 1);
                setSuggestBox(0);
                setShadowFor("scope");
              }}
            >
              <div className="search-box__scope--facade">
                <span>{category}</span>
                <i className="fa fa-caret-down"></i>
              </div>
            </div>
          </div>

          {navScope % 2 > 0 && categories && (
            <div className="scope__windows">
              <ul className="scope__drop-list">
                {["All Categories", ...categories, ...categories].map(
                  (cat, i) => (
                    <li
                      key={i}
                      className={
                        (cat === category ? "selected " : "") + "category"
                      }
                      onClick={() => {
                        if (cat !== category) {
                          setCategory(cat);
                          setNavScope(0);
                          // setOutline("focus");
                          //setSuggestBox(2);
                          inputRef.current.focus();
                          setSuggestBox(-1);
                          setShadowFor("");
                        } else {
                          setNavScope(2);
                          setOutline("");
                        }
                      }}
                      onBlur={() => setNavScope(0)}
                    >
                      <i className="fa fa-check"></i> {cat}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        <div className="row--fill">
          <div className="search__input">
            <input
              type="text"
              ref={inputRef}
              name="q"
              autoComplete="off"
              id="q"
              value={input}
              size="1"
              tabIndex="2"
              aria-label="search input"
              onClick={(e) => {
                if (input) {
                  const newSuggests = findSuggest.search(list, input);
                  if (newSuggests.length) {
                    setSuggests(newSuggests);
                    setShadowFor("searchBox");
                    setSuggestBox(1);
                  }
                }
                setNavScope(0);
              }}
              onFocus={(e) => {
                if (input) {
                  const newSuggests = findSuggest.search(list, input);
                  if (newSuggests.length) {
                    setSuggests(newSuggests);
                    setShadowFor("searchBox");
                    setSuggestBox(1);
                  }
                }
                setOutline("focus");
                setNavScope(0);
              }}
              onKeyUp={(e) => {
                const { value } = e.target;
                if (
                  value.length === 0 ||
                  e.key === "Escape" ||
                  e.keyCode == 27
                ) {
                  setSuggestBox(0);
                  setShadowFor("");
                  return;
                }
                if (e.key === "Enter" || e.keyCode == 13)
                  return submitHandler();
                // if (value === input) return;
                setSuggestBox((suggestBox || 1) + 2);
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
                setSuggestBox(suggestBox > 0 ? 1 : 0);
                // setShadowFor("");
              }}
            ></input>
          </div>

          {shadowFor === "searchBox" && suggestBox % 2 > 0 && input && (
            <div className="search__suggest">
              <ul>
                {suggests.slice(0, 12).map((p, id) => (
                  <li key={id}>
                    <Link
                      to={`/search/name/${p.name.replace(
                        /(<b>)|(<\/b>)/g,
                        ""
                      )}`}
                      dangerouslySetInnerHTML={{ __html: p.name }}
                      onClick={(e) => {
                        setSuggestBox(0);
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
