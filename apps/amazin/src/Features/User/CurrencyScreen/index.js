import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateCurrencyRates } from '../../../apis/productAPI';
import { updateUserProfile } from '../../../apis/userAPI';
import { currencyTypeActions } from '../../../slice/ProductSlice';
import { userUpdateProfileActions } from '../../../slice/UserSlice';
import './currencyScreen.css';

import MessageBox from '../../../components/MessageBox';
import { Storage, pipe } from '../../../utils';
import { KEY } from '../../../constants';
import Button from '../../../components/Button';

export default function CurrencyScreen() {
  const dispatch = useDispatch();
  const { cType } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);

  const [currency, setCurrency] = useState(cType || pipe.currency);
  const [newCurrency, setNewCurrency] = useState('');

  let back = Storage[KEY.HISTORY];
  back = !back || back.startsWith('/currency') ? '/' : back;

  useEffect(() => {
    setNewCurrency('');
    setCurrency(cType || pipe.currency);
    if (!userInfo?._id) {
      dispatch(userUpdateProfileActions._RESET());
    }
  }, [cType, dispatch, userInfo?._id]);

  const submitHandler = () => {
    Storage[KEY.CURRENCY] = currency;
    pipe.setCurrency(currency);
    dispatch(updateCurrencyRates());
    if (userInfo)
      dispatch(
        updateUserProfile({
          userId: userInfo._id,
          currency
        })
      );
    dispatch(currencyTypeActions._CHANGE(currency));
    setNewCurrency(currency);
  };

  return (
    <div className="c-screen currency">
      <header className="container flex">
        <div className="col-50p">
          <h2 className="title">Language Settings</h2>

          <p className="sub-title">
            Select the language you prefer for browsing, shopping, and
            communications.
          </p>

          <div className="languages">
            <ul className="max-30">
              <li className="language active">
                <div className="sprite__wrapper">
                  <div className="sprite circle"></div>
                  <span>
                    English - EN - <i>Translation</i>
                  </span>
                </div>
              </li>

              <li className="separator"></li>
              {[
                ['Deutsch', 'DE', 'Übersetzen'],
                ['Nederlands', 'NL', 'Vertaling'],
                ['Polski', 'PL', 'Tłumaczenie'],
                ['Türkçe', 'TR', 'Çeviri'],
                ['Čeština', 'CS', 'Překlad']
              ].map(([label, short, text], id) => (
                <li key={id} className="language disabled">
                  <div className="sprite__wrapper">
                    <div className="sprite circle"></div>
                    <span>
                      {label} - {short} - <i>{text}</i>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <br />
          </div>
        </div>

        <div className="col-50p">
          <b>Translation</b>
          <p className="disabled">
            We'll translate the most important information for your browsing,
            shopping, and communications.
          </p>
        </div>
      </header>

      <div className="divider-inner"></div>
      <div className="container currencies">
        <section className="col-50p">
          <h2 className="title"> Currency Settings</h2>

          {!!newCurrency && (
            <>
              <MessageBox variant="success" show>
                Currency Setting has been changed to{' '}
                {pipe.longName[newCurrency]}
              </MessageBox>

              <br />
              <Button to={back} primary label="Back To Your Last Session" />
              <div className="separator divider-inner"></div>
            </>
          )}

          <p>Select the currency you want to shop with.</p>
          <div className="select-wrapper col-50p">
            <div className="sprite__caret"></div>
            <select
              id="currency"
              value={currency}
              data-select="true"
              onChange={(e) => {
                e.stopPropagation();
                setCurrency(e.target.value);
              }}
            >
              <optgroup label="Select Currency">
                {pipe.currencies.map((c, id) => (
                  <option value={c} key={id}>
                    {pipe.getSymbol(c)} - {c} - {pipe.longName[c]}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {currency !== 'EUR' && (
            <p>
              {`Note: You will be shown prices in ${pipe.getSymbol(
                currency
              )} - ${currency} - ${
                pipe.longName[currency]
              } on Amazin as a reference only. You may or may not be able to pay in ${pipe.getSymbol(
                currency
              )} - ${currency} - ${
                pipe.longName[currency]
              } see more details during checkout.`}
            </p>
          )}
        </section>
        <div className="col-50p"></div>
      </div>

      <div className="divider-inner"></div>
      <div className="container">
        <div className="col-50p p-1">
          <Button to={back} xs label="Cancel" />

          <Button primary xs label="Save Changes" onClick={submitHandler} />
        </div>
      </div>
    </div>
  );
}
