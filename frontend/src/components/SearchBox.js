import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";

export default function SearchBox() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [isFocus, setFocus] = useState(0);
  const { productList: list } = useSelector((state) => state.productListAll);

  useEffect(() => {
    dispatch(listAllProducts({ pageSize: 999 }));
  }, [history]);
  const submitHandler = (e) => {
    e.preventDefault();
    setFocus(-1); //for absorbing a keypress on submit instead setFocus(0)
    history.push(`/search/name/${term}`);
  };

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
    <div className="nav-item__col col-fill">
      <label
        className={isFocus > 0 && term ? "click-catcher" : ""}
        onClick={() => setFocus(0)}
      ></label>
      <form className="search__form" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="q"
            autoComplete="off"
            id="q"
            value={term}
            size="1"
            tabIndex="1"
            onClick={(e) => {
              setFocus(1);
              setSuggests(findSuggest.search(list, term));
            }}
            onFocus={(e) => {
              setFocus(1);
              setSuggests(findSuggest.search(list, term));
            }}
            onChange={(e) => setTerm(e.target.value)}
            onKeyUp={(e) => {
              setFocus(isFocus + 1);
              setSuggests(findSuggest.search(list, e.target.value));
            }}
            onBlur={() => setFocus(1)}
          ></input>
          <button className="primary" type="submit">
            <div className="sprite__search-btn"></div>
          </button>
        </div>
      </form>
      {isFocus > 0 && term && (
        <div className="search__suggest">
          <ul>
            {suggests.slice(0, 12).map((p) => (
              <li>
                <Link
                  to={`/search/name/${p.name.replace(/(<b>)|(<\/b>)/g, "")}`}
                  dangerouslySetInnerHTML={{ __html: p.name }}
                  onClick={(e) => {
                    setTerm(p.name.replace(/(<b>)|(<\/b>)/g, ""));
                    setSuggests([]);
                    setFocus(0);
                  }}
                ></Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
