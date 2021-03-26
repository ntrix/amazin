import React from "react";
import { Link } from "react-router-dom";
import MessageBox from "../../components/MessageBox";

export default function Screen404(props) {
  return (
    <>
      <div className="c-screen customer">
        <header className="container">
          <h1 className="title">SORRY! Something wrong happens!</h1>
          <h3 className="sub-title">
            The requested page could not be found! Please use the search
            function or go directly to Amazin.
          </h3>
        </header>
        <div className="divider-inner"></div>
        <div className="container">
          <MessageBox variant="danger">
            <h2>404: Page not found</h2>
          </MessageBox>
        </div>
        <div className="divider-inner"></div>
        <div className="container">
          <Link to="/customer">
            <button className="primary mb-1">
              Contact our Customer Service
            </button>
          </Link>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
