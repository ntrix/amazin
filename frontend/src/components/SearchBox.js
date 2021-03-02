import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listAllProducts } from "../Controllers/productActions";

export default function SearchBox(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [suggests, setSuggests] = useState([]);
  const { productList: list } = useSelector((state) => state.productListAll);

  const groupLeft = "<b>";
  const groupRight = "</b>";
  useEffect(() => {
    dispatch(listAllProducts({ pageSize: 999 }));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  const findSuggest = (() => {
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
        let kr = keyReg(keyword);
        let result = [];
        for (let e of list) {
          if (kr.regexp.test(e.name)) {
            //console.log({ e, kr, groupReg });
            result.push({
              name: e.name
                .replace(kr.regexp, kr.replacement)
                .replace(groupReg, ""),
              _id: e._id,
            });
            //console.log(result[result.length - 1]);
          }
        }
        //console.log(`result::::`, result);
        return result.sort(
          (a, b) => findMax(b.name, keyword) - findMax(a.name, keyword)
        ); //result.map((el) => `${el}`);
      },
    };
  })();

  return (
    <div className="nav-item__col">
      <form className="search" onSubmit={submitHandler}>
        <div className="row">
          <input
            type="text"
            name="q"
            autoComplete="off"
            id="q"
            className="enter-key"
            value={name}
            tabIndex="1"
            onFocus={(e) =>
              setSuggests(
                e.target.value ? findSuggest.search(list, e.target.value) : []
              )
            }
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) =>
              setSuggests(
                e.target.value ? findSuggest.search(list, e.target.value) : []
              )
            }
            onBlur={(e) => {
              setSuggests([]);
            }}
          ></input>
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {suggests && (
        <div className="search__suggest">
          <ul>
            {suggests.slice(0, 12).map((p) => (
              <li>
                <Link
                  to={`/product/${p._id}`}
                  dangerouslySetInnerHTML={{ __html: p.name }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setName(
                      p.name.replace(groupLeft, "").replace(groupRight, "")
                    );
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
