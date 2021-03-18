import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { changeCurrency } from "../../Controllers/productActions";

function CurrencyScreen(props) {
  const { type: pType } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSignin);
  const { type, rate } = useSelector((state) => state.currencyType);
  const [currency, setCurrency] = useState(pType);

  return (
    <div className="c-screen">
      <header className="container">
        <h1 className="title">We’re here to help, {user?.username || ""}</h1>
        <h3 className="sub-title">
          We’ll walk you through fixing most things here or connect you to
          someone if you need more help.
        </h3>
      </header>
      <div className="divider-inner"></div>
      <div className="container">
        <h2>What can we assist you with today?</h2>
        <div className="separator mb-1"></div>
        <section className="help-section col-fill">
          <h2>In construction</h2>
          <p>Help Section:</p>
          <div>
            <label htmlFor="currency">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="EUR">EUR Euro</option>
              <option value="GBP">GBP Great Britain Pounds</option>
              <option value="USD">USD US Dollar</option>
              <option value="CZK">CZK</option>
              <option value="PLN">PLN</option>
            </select>
          </div>
          <div>
            <Link to={localStorage.getItem("backToHistory")}>
              <button>Cancel</button>
            </Link>
            <Link to={localStorage.getItem("backToHistory")}>
              <button
                class="btn primary"
                onClick={() => dispatch(changeCurrency(currency))}
              >
                Save
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CurrencyScreen;
