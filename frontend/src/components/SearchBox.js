import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../Controllers/productActions";

export default function SearchBox(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const { productList: list } = useSelector((state) => state.productListAll);

  useEffect(() => {
    dispatch(listAllProducts({ pageSize: 999 }));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  const suggest = (() => {
    const validate = (reg) =>
      reg.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");

    let groupLeft = "<b>";
    let groupRight = "</b>";
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
          if (kr.regexp.test(e)) {
            console.log({ e, kr, groupReg });
            result.push(
              e.replace(kr.regexp, kr.replacement).replace(groupReg, "")
            );
            console.log(result[result.length - 1]);
          }
        }
        result = result.sort(
          (a, b) => findMax(b, keyword) - findMax(a, keyword)
        );
        //console.log(`result::::`, result);
        return result.map((el) => `${el}`);
      },
    };
  })();

  const [rs, setRs] = useState([]);
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
            text=""
            tabIndex="1"
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) =>
              setRs(e.target.value ? suggest.search(list, e.target.value) : [])
            }
          ></input>
          <button className="primary" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {rs && (
        <div className="search__suggest">
          <ul>
            {rs.slice(0, 12).map((s) => (
              <li dangerouslySetInnerHTML={{ __html: s }}></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
