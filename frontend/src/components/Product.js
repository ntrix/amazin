import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getPrice, getSymbol } from "../utils";
import Rating from "./Rating";

export default function Product({ product, deal = false }) {
  const location = useLocation();
  const { type, rate } = useSelector((state) => state.currencyType);
  const evalPrice = getPrice(rate);
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
          <div className="">
            {!deal ? (
              <div className="price">
                <sup>{getSymbol(type)}</sup>
                {evalPrice(product.price).note}
                <sup>{evalPrice(product.price).cent}</sup>
              </div>
            ) : (
              <>
                <div>
                  <span className="price danger">
                    <sup>{getSymbol(type)}</sup>
                    {evalPrice(product.price).note}
                    <sup>{evalPrice(product.price).cent}</sup>
                  </span>
                  <span className=" pull-right">
                    <b className="price strike">
                      <sup>{getSymbol(type)}</sup>

                      {evalPrice(product.price / (1 - product.deal / 100)).all}
                    </b>
                    {"  (" + product.deal}%)
                  </span>
                </div>
              </>
            )}
            {!deal && (
              <>
                <sub>
                  Shipping: {getSymbol(type)}
                  {evalPrice(product.ship).all} excl.
                </sub>
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
            {deal && (
              <div>
                <Link
                  to={`/search/category/:${product?.category}`}
                  className="row"
                >
                  Category: {product?.category}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
