import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { pipe } from "../utils";
import Rating from "./Rating";

export default function ProductCard({ product, deal = false }) {
  const location = useLocation();
  const saveHistory = () => {
    localStorage.setItem("backToHistory", location.pathname);
  };
  return (
    <div key={product._id} className="card flex">
      <div className="card__center">
        <Link to={`/product/${product._id}`} onClick={saveHistory}>
          <img
            className="thumbnail"
            src={
              product.image.split("^")[deal ? 1 : 0] ||
              product.image.split("^")[0] ||
              "images/no-default-thumbnail.png"
            }
            alt={product.name}
          />
        </Link>
        <div className="card__body">
          <Link to={`/product/${product._id}`} onClick={saveHistory}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div>
            <div>
              <span className={"price" + (deal ? " danger" : "")}>
                <sup>{pipe.getSymbol()}</sup>
                {pipe.getNote(product.price)}
                <sup>{pipe.getCent(product.price)}</sup>
              </span>
              {deal && (
                <span className="pull-right">
                  <b className="price strike">
                    <sup>{pipe.getSymbol()}</sup>
                    {pipe.getPrice(product.price / (1 - product.deal / 100))}
                  </b>
                  {"  (" + product.deal}% off)
                </span>
              )}
            </div>
            {deal ? (
              <div>
                <Link
                  to={`/search/category/:${product?.category}`}
                  className="row"
                >
                  Category: {product?.category}
                </Link>
              </div>
            ) : (
              <>
                <sub>Shipping: {pipe.showPrice(product.ship)} excl.</sub>
                <div>
                  <Link
                    to={`/seller/${product.seller._id}`}
                    className="row end text-right"
                  >
                    Seller & Store
                    <br />
                    {product?.seller?.seller?.name || "Anonymous Seller"}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
