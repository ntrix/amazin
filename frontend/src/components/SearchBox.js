import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";

export default function SearchBox(props) {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [suggests, setSuggests] = useState([]);
  const [isFocus, setFocus] = useState(false);
  const { productList: list } = useSelector((state) => state.productListAll);

  useEffect(() => {
    dispatch(listAllProducts({ pageSize: 999 }));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${term}`);
  };

  const findSuggest = (() => {
    const groupLeft = "<b>";
    const groupRight = "</b>";
    const validate = (reg) =>
      reg.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");

    let groupReg = new RegExp(validate(groupRight + groupLeft), "g");
    let groupExtractReg = new RegExp(
      "(" + validate(groupLeft) + "[\\s\\S]+?" + validate(groupRight) + ")",
      "g"
    );
    const findMax = (str, keyword) => {
      let max = 0;
      keyword = groupLeft + keyword + groupRight;
      str.replace(groupExtractReg, (m) => {
        if (keyword == m) {
          max = 999;
        } else if (m.length > max) {
          max = m.length;
        }
      });
      return max;
    };
    const keyReg = (key) => {
      let source = "(.*?)";
      key.split("").forEach((k) => (source += "(" + validate(k) + ")(.*?)"));
      let replacer = "";
      for (var i = 1, len = key.length; len > 0; len--)
        replacer += "$" + i++ + groupLeft + "$" + i++ + groupRight;
      return {
        regexp: new RegExp(source, "i"),
        replacement: replacer + "$" + i,
      };
    };

    return {
      search(list, keyword) {
        keyword = keyword.slice(0, 40);
        let kr = keyReg(keyword);
        let result = [];
        for (let e of list) {
          if (kr.regexp.test(e.name)) {
            result.push({
              name: e.name
                .replace(kr.regexp, kr.replacement)
                .replace(groupReg, ""),
              _id: e._id,
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
    <div className="nav-item__col">
      <label
        className={isFocus && term ? "click-catcher" : ""}
        onClick={() => setFocus(false)}
      ></label>
      <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="q"
            autoComplete="off"
            id="q"
            value={term}
            tabIndex="1"
            onFocus={(e) => {
              setFocus(true);
              setSuggests(findSuggest.search(list, term));
            }}
            onChange={(e) => setTerm(e.target.value)}
            onKeyUp={(e) =>
              setSuggests(findSuggest.search(list, e.target.value))
            }
            onBlur={() => setFocus(true)}
          ></input>
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {isFocus && term && (
        <div className="search__suggest">
          <ul>
            {suggests.slice(0, 12).map((p) => (
              <li>
                <Link
                  to={`/product/${p._id}`}
                  dangerouslySetInnerHTML={{ __html: p.name }}
                  onClick={(e) => {
                    setTerm(p.name.replace(/(<b>)|(<\/b>)/g, ""));
                    setSuggests([]);
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
