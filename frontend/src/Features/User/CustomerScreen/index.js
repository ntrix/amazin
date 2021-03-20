import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./customerScreen.css";

function CustomerScreen({}) {
  const { user } = useSelector((state) => state.userSignin);

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
        <div className="c-boxes">
          {[
            [
              "order",
              "Your Orders",
              "Track parcels",
              "Edit or cancel orders",
              "/order-history",
            ],
            [
              "return",
              "Returns & Refunds",
              "Return or exchange items",
              "Print return mailing labels",
              ,
              "disabled",
            ],
            [
              "digital",
              "Address Management",
              "Find local address",
              "Check shipping service",
              "/shipping",
            ],
            [
              "video",
              "Your Video Account",
              "Kid account control",
              "Parenting discussion",
              "/video",
            ],
            [
              "payment",
              "Payment Options",
              "Add or edit payment methods",
              "Change your currency",
              "/currency/cType/EUR",
            ],
            [
              "account",
              "Your Account",
              "Manage your account preferences",
              "Update login information",
              "/profile",
            ],
            [
              "report",
              "Report Something Suspicious",
              "Scam Call or Phishing Email",
              ,
              "/contact/subject/Report",
            ],
            [
              "gift",
              "Gift Cards & Top Up",
              "Need a gift, a box,",
              "Anniversary?",
              "/search/category/Gifts And Boxes",
            ],
            [
              "contact",
              "Contact Us",
              "Contact our Customer Service",
              "via Phone or Chat",
              "/contact/subject/Customer",
            ],
            [
              "covid19",
              "COVID-19 & Information",
              "FAQs about the impact on ordering",
              ,
              ,
              "disabled",
            ],
          ].map(([img, label, line1, line2, link, className]) => (
            <Link to={link} className={"c-box " + className}>
              <div className="c-box__inner">
                <div className="c-box__icon-wrapper">
                  <img
                    className="c-box__icon"
                    src={`/images/icon-${img}.png`}
                  ></img>
                </div>
                <div className="c-box__info">
                  <h3 className="c-box__label">{label}</h3>
                  <ul className="c-box__text">
                    <li>{line1}</li>
                    <li>{line2}</li>
                  </ul>
                </div>
              </div>
            </Link>
          ))}
          <div className="separator mb-1"></div>
          <section className="help-section col-fill">
            <label htmlFor="search-faq">
              <h3>
                Search the help library
                <i> Type something like, "question about a charge"</i>
              </h3>
            </label>
            <input type="search" id="search-faq"></input>
            <h1>Browse Help Topics </h1>
            <h2>In construction</h2>
            <p>Help Section:</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CustomerScreen;
