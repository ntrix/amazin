import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { changeCurrency } from "../../Controllers/productActions";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

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
    <div className="c-screen">
      <header className="container">
        <h1 className="title">Language Settings</h1>
        <h3 className="sub-title">
          Select the language you prefer for browsing, shopping, and
          communications.
        </h3>
      </header>
      <div className="divider-inner"></div>
      <div className="container">
        <ul className="disabled">
          <li>
            Deutsch - DE - <i>Übersetzen</i>
          </li>
          <li>
            English - EN - <i>Translation</i>
          </li>
          <li>
            Nederlands - NL - <i>Vertaling</i>
          </li>
          <li>
            Polski - PL - <i>Tłumaczenie</i>
          </li>
          <li>
            Türkçe - TR - <i>Çeviri</i>
          </li>
          <li>
            Čeština - CS - <i>Překlad</i>
          </li>
        </ul>
        <br />
        <div className="separator"></div>
        <section className="help-section form">
          <h2> Currency Settings</h2>
          <p>Select the currency you want to shop with.</p>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          {success && <MessageBox variant="success">{success}</MessageBox>}
          <label htmlFor="currency">Choose Currency</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="EUR">EUR Euro</option>
            <option value="GBP">GBP Great Britain Pounds</option>
            <option value="USD">USD US Dollar</option>
            <option value="CZK">CZK</option>
            <option value="PLN">PLN</option>
            <option value="CHF">CHF</option>
          </select>
        </section>
      </div>

      <div className="divider-inner"></div>
      <div className="container p-1">
        <Link to={localStorage.getItem("backToHistory")}>
          <button className="small mr-1">Cancel</button>
        </Link>
        <Link to={localStorage.getItem("backToHistory")}>
          <button
            className="btn primary small"
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
