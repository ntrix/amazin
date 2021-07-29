import React from 'react';
import { useSelector } from 'react-redux';
import { customerMenuTemplate } from './customerMenuTemplate';
import CustomerCard, { mapCustomerCardProp } from './CustomerCard';
import './customerScreen.css';

export default function CustomerScreen() {
  const { user } = useSelector((state) => state.userSignin);

  return (
    <div className="c-screen customer">
      <header className="container">
        <h1 className="title">We’re here to help, {user?.username || ''}</h1>
        <h3 className="sub-title">
          We’ll walk you through fixing most things here or connect you to
          someone if you need more help.
        </h3>
      </header>

      <div className="divider"></div>

      <div className="container">
        <h2>What can we assist you with today?</h2>
        <div className="c-boxes">
          {customerMenuTemplate.map(mapCustomerCardProp).map((props, id) => (
            <CustomerCard key={id} {...props} />
          ))}

          <div className="separator mb-1"></div>

          <section className="help-section col-fill">
            <label htmlFor="search-faq">
              <h3>
                Search the help library
                <i> Type something like, "question about a charge"</i>
              </h3>
            </label>

            <input type="text" id="search-faq"></input>

            <h1>Browse Help Topics </h1>

            <h2>In construction</h2>

            <p>Help Section:</p>
          </section>
        </div>
      </div>
    </div>
  );
}
