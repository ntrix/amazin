import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";

export default function SearchBox({ shadowFor, setShadowFor }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productList: list } = useSelector((state) => state.productListAll);
  const { success, categories } = useSelector(
    (state) => state.productCategoryList
  );
  const [navScope, setNavScope] = useState(0);
  const [category, setCategory] = useState("All Categories");

  const [input, setInput] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [suggestBox, setSuggestBox] = useState(0);
  const [outline, setOutline] = useState("");

  useEffect(() => {
    dispatch(
      listAllProducts({
        category: category === "All Categories" ? "" : category,
        pageSize: 999,
      })
    );
  }, [dispatch, category, success]);

  const submitHandler = (e) => {
    e?.preventDefault();
    setSuggestBox(-1); //for absorbing a keypress on submit instead setSuggestBox(0)
    setShadowFor("");
    history.push(
      `/search/category/${
        category === "All Categories" ? "All" : category
      }/name/${input}`
    );
  };
  useEffect(() => {
    if (shadowFor === "searchBox") return;
  }, [shadowFor]);

  const findSuggest = (() => {
    const LL = "<b>";
    const RR = "</b>";
    const rep = (r) => r.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");
    const combine_R_L = new RegExp(rep(RR + LL), "g");
    const group = new RegExp("(" + rep(LL) + "[\\s\\S]+?" + rep(RR) + ")", "g");
    const findMax = (string, word) => {
      let max = 0;
      word = LL + word + RR;
      string.replace(group, (found) => {
        if (word == found) max = 999;
        else if (found.length > max) max = found.length;
      });
      return max;
    };
    const regExpKey = (key) => {
      const source = key
        .split("")
        .reduce((acc, k) => acc + "(" + rep(k) + ")(.*?)", "(.*?)");
      let replacer = "";
      for (var i = 1, len = key.length; len > 0; len--)
        replacer += "$" + i++ + LL + "$" + i++ + RR;
      return {
        regEx: new RegExp(source, "i"),
        replacer: replacer + "$" + i,
      };
    };

    return {
      search(list, keyword) {
        if (!list || !keyword) return [];
        keyword = keyword.slice(0, 49);
        const keyReg = regExpKey(keyword);
        const result = [];
        for (let el of [...list]) {
          if (keyReg.regEx.test(el.name)) {
            result.push({
              name: el.name
                .replace(keyReg.regEx, keyReg.replacer)
                .replace(combine_R_L, ""),
              _id: el._id,
            });
          }
        }
        return result.sort(
          (a, b) => findMax(b.name, keyword) - findMax(a.name, keyword)
        );
      },
    };
  })();

  return (
    <>
      <form className={"search-form " + outline} onSubmit={submitHandler}>
        <div className="row--left">
          <div className="search__dropdown">
            <div
              className={(navScope > 0 ? "focus " : "") + " search__scope"}
              onClick={() => {
                setNavScope(navScope + 1);
                setSuggestBox(0);
                setShadowFor(navScope > 0 ? "scope" : "");
              }}
            >
              <div className="search__scope--trans">
                <span>{category}</span>
                <i className="fa fa-caret-down"></i>
              </div>
            </div>
          </div>

          {navScope % 2 > 0 && categories && (
            <div className="scope__windows">
              <ul className="scope__drop-list">
                {[
                  "All Categories",
                  ...categories,
                  ...categories,
                  ...categories,
                ].map((cat) => (
                  <li
                    className={
                      (cat === category ? "selected " : "") + "category"
                    }
                    onClick={() => {
                      if (cat !== category) {
                        setOutline(true);
                        //setSuggestBox(2);focus ref
                        setCategory(cat);
                        setNavScope(0);
                      } else setNavScope(2);
                    }}
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
              name="q"
              autoComplete="off"
              id="q"
              value={input}
              size="1"
              tabIndex="1"
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
                if (value.length === 1) {
                  setShadowFor("searchBox");
                  if (!outline) setOutline("focus");
                }
                setSuggests(findSuggest.search(list, value));
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
                {suggests.slice(0, 12).map((p) => (
                  <li>
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
            <span className="sprite__search-btn" aria-label="Go">
              <input type="submit" value="Go" tabIndex={0}></input>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
