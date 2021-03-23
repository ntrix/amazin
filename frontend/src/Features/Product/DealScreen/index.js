import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductCard from "../../../components/ProductCard";
import { listProducts } from "../../../Controllers/productActions";
import Carousel, { responsive } from "../../../utils";
import "./dealScreen.css";

export default function DealScreen() {
  const history = useHistory();
  const {
    category = "Deals",
    order = "bestselling",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList);
  const [cat, setCat] = useState("Deals");

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        category: cat === "Deals" ? "" : cat,
        order,
        deal: 1,
        pageSize: 990,
      })
    );
  }, [category, dispatch, order, pageNumber, cat]);
  return (
    <>
      <header className="screen__header">
        <ul className="cat-nav">
          {loadingCategories ? (
            <LoadingBox />
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            ["Deals", ...categories].map((label) => (
              <li
                key={label}
                className={label === cat ? " selected" : ""}
                onClick={() => setCat(label)}
              >
                {label}
              </li>
            ))
          )}
        </ul>
      </header>
      <div
        className={"deal-screen" + (Math.random() < 0.5 ? "" : " screen--1")}
      >
        {loading ? (
          <LoadingBox xl />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            centerMode={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {products.length === 0 ? (
              <MessageBox>No Deals On This Category!</MessageBox>
            ) : (
              products.map((product, id) => (
                <ProductCard deal key={id} product={product}></ProductCard>
              ))
            )}
          </Carousel>
        )}
        <h2 className="mh-2">Top Deals</h2>
        <div className="row top">
          <div className="row search__banner">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <div className="search__counter">
                {products.length} of {count} Results
              </div>
            )}
            <div className="sort__filter">
              <label htmlFor="filter__options">Sort by</label>
              <div className="sprite__caret"></div>
              <select
                id="filter__options"
                value={order}
                onChange={(e) =>
                  history.push(
                    `/deal/category/all/order/${e.target.value}/pageNumber/1`
                  )
                }
              >
                <optgroup label="Sort by:">
                  <option value="newest">Newest Arrivals</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Avg. Rating</option>
                </optgroup>
              </select>
            </div>
          </div>
          {loading ? (
            <LoadingBox xl />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <ProductCard
                    deal
                    key={product._id}
                    product={product}
                  ></ProductCard>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
