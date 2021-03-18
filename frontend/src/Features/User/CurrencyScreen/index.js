import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { changeCurrency } from "../../../Controllers/productActions";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import { pipe } from "../../../utils";
import "./currencyScreen.css";

function CurrencyScreen(props) {
  const { type: pType } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSignin);
  const { type, rate, loading, success, error } = useSelector(
    (state) => state.currencyType
  );
  const [currency, setCurrency] = useState(pType);
  useEffect(() => {
    setCurrency(pType);
  }, [pType]);

  return (
    <div className="currency c-screen">
      <header className="container flex">
        <div className="col-50p">
          <h2 className="title">Language Settings</h2>
          <p className="sub-title">
            Select the language you prefer for browsing, shopping, and
            communications.
          </p>
          <div className="languages">
            <ul className="max-30 disabled">
              <li className="sprite__wrapper active">
                <div className="sprite circle"></div>
                <span>
                  English - EN - <i>Translation</i>
                </span>
              </li>
              <li className="separator"></li>
              <li className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>
                  Deutsch - DE - <i>Übersetzen</i>
                </span>
              </li>
              <li className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>
                  Nederlands - NL - <i>Vertaling</i>
                </span>
              </li>
              <li className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>
                  Polski - PL - <i>Tłumaczenie</i>
                </span>
              </li>
              <li className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>
                  Türkçe - TR - <i>Çeviri</i>
                </span>
              </li>
              <li className="sprite__wrapper">
                <div className="sprite circle"></div>
                <span>
                  Čeština - CS - <i>Překlad</i>
                </span>
              </li>
            </ul>
            <br />
          </div>
        </div>
        <div className="col-50p disabled">
          <b>Translation</b>
          <p>
            We'll translate the most important information for your browsing,
            shopping, and communications.
          </p>
        </div>
      </header>
      <div className="divider-inner"></div>
      <div className="container currencies">
        <section className="col-50p">
          <h2 className="title"> Currency Settings</h2>
          <p>Select the currency you want to shop with.</p>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          {success && <MessageBox variant="success">{success}</MessageBox>}
          <select
            id="currency"
            className="col-50p"
            value={currency}
            onChange={(e) => {
              e.stopPropagation();
              setCurrency(e.target.value);
            }}
          >
            <legend htmlFor="currency">Select Currency</legend>
            {pipe().list.map((type) => (
              <option value={type}>
                {pipe(type).symbol} - {type} - {pipe(type).name}
              </option>
            ))}
          </select>
          {currency !== "EUR" && (
            <p>
              {`Note: You will be shown prices in ${
                pipe(currency).symbol
              } - ${currency} - ${
                pipe(currency).name
              } on amazin as a reference only. You may or may not be able to pay in ${
                pipe(currency).symbol
              } - ${currency} - ${
                pipe(currency).name
              } see more details during checkout.`}
            </p>
          )}
        </section>
        <div className="col-50p"></div>
      </div>

      <div className="divider-inner"></div>
      <div className="container p-1">
        <Link to={localStorage.getItem("backToHistory")}>
          <button className="btn--xs">Cancel</button>
        </Link>
        <Link to={localStorage.getItem("backToHistory")}>
          <button
            className="btn primary btn--xs"
            onClick={() => dispatch(changeCurrency(currency))}
          >
            Save Changes
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CurrencyScreen;
