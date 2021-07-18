import React from "react";
import { Link } from "react-router-dom";
import { RATES_SOURCE } from "../../constants";
import { pipe, savePath } from "../../utils";

export default function DropMenuCurrency({ currency }) {
  return (
    <ul className="dropdown__menu show">
      <li>Change Currency</li>

      {["EUR", "separator", ...pipe.currencies.slice(1)].map((label, id) =>
        label === "separator" ? (
          <div key={id} className="separator ml-1"></div>
        ) : (
          <Link
            key={id}
            to={"/currency/cType/" + label}
            className={label === currency && "active"}
            onClick={savePath("/curr")}
          >
            <div className="sprite__wrapper">
              <div className="sprite circle"></div>
              <span>{pipe.getName(label)}</span>
            </div>
          </Link>
        )
      )}
      <div className="separator"></div>

      <li>Currency Calculator</li>

      <li className="calculator disabled">
        <Link to="#">€ - EUR - Euro</Link>
        <Link to="#">Base</Link>
      </li>
      <div className="separator"></div>

      <a href={RATES_SOURCE} target="_blank" rel="noreferrer">
        <div className="sprite__wrapper">
          <div className={"sprite flag xl " + currency}></div>
          <span>Exchange Reference Rates</span>
        </div>
      </a>
    </ul>
  );
}
