import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import ProductCard from "../../../components/ProductCard";
import SortFilter from "../../../components/SortFilter";
import { listProducts } from "../../../Controllers/productActions";
import Carousel, { dummyProducts, responsive } from "../../../utils";
import "./dealScreen.css";

export default function DealScreen() {
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
            ["Deals", ...categories].map((label, id) => (
              <li
                key={id}
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
          {loading ? (
            <LoadingBox xl />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : !products.length ? (
            <MessageBox>No Deals On This Category!</MessageBox>
          ) : (
            products.map((product, id) => (
              <ProductCard deal key={id} product={product}></ProductCard>
            ))
          )}
        </Carousel>
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

            <SortFilter
              order={order}
              getUrl={({ order }) =>
                `/deal/category/all/order/${order}/pageNumber/1`
              }
            />
          </div>
          {loading ? (
            <LoadingBox xl />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            !products.length && <MessageBox>No Product Found</MessageBox>
          )}
          <div className="row center">
            {(products ? products : dummyProducts).map((product, id) => (
              <ProductCard deal key={id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
