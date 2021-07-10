import React from "react";
import { Link } from "react-router-dom";
import { getImgUrl, NO_IMAGE, pipe, savePath } from "../constants";
import Rating from "./Rating";

export default function ProductCard({ product, deal = false }) {
  return (
    <div className="card flex">
      <div className="card__center">
        <Link to={`/product/${product._id}`} onClick={savePath()}>
          <img
            className="thumbnail"
            src={getImgUrl(
              product._id,
              product.image.split("^")[deal ? 1 : 0] ||
                product.image.split("^")[0] ||
                NO_IMAGE
            )}
            alt={product.name}
          />
        </Link>

        <div className="card__body">
          <Link to={`/product/${product._id}`} onClick={savePath()}>
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
