import React from "react";
import { Link, useLocation } from "react-router-dom";
import Rating from "./Rating";

export default function Product({ product }) {
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
            src={product.image.split("^")[0]}
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
            <div className="price">
              <sup>€</sup>
              {product.price}
              <sup>00</sup>
            </div>
            <sub>Shipping exklusive</sub>
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
          </div>
        </div>
      </div>
    </div>
  );
}
