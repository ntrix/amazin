import React from "react";
import { Link, useLocation } from "react-router-dom";
import Rating from "./Rating";

export default function Product({ product, deal = false }) {
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
          <div className="">
            {!deal ? (
              <div className="price">
                <sup>€</sup>
                {product.price | 0}
                <sup>{(((product.price * 100) | 0) + "").slice(-2)}</sup>
              </div>
            ) : (
              <>
                <div>
                  <span className="price danger">
                    <sup>€</sup>
                    {product.price | 0}
                    <sup>{(((product.price * 100) | 0) + "").slice(-2)}</sup>
                  </span>
                  <span className=" pull-right">
                    <b className="price strike">
                      <sup>€</sup>
                      {(product.price / (1 - product.deal / 100)).toFixed(2)}
                    </b>
                    {"  (" + product.deal}%)
                  </span>
                </div>
              </>
            )}
            {!deal && (
              <>
                <sub>Shipping: €{product.ship} excl.</sub>
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
