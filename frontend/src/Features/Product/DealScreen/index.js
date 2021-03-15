import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";

import { listProducts } from "../../../Controllers/productActions";

import LoadingBox from "../../../components/LoadingBox";
import MessageBox from "../../../components/MessageBox";
import Product from "../../../components/Product";
import Carousel, { responsive } from "../../../utils";
import "./dealScreen.css";

export default function DealScreen() {
  const history = useHistory();
  const {
    category = "all",
    order = "bestselling",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, count } = productList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        category: category !== "all" ? category : "",
        order,
        deal: 1,
        pageSize: 990,
      })
    );
  }, [category, dispatch, order, pageNumber]);
  return (
    <div className="deal-screen">
      {loading ? (
        <LoadingBox size="xl" />
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
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={1500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products.map((product) => (
            <Product deal product={product}></Product>
          ))}
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
            Sort by{" "}
            <select
              value={order}
              onChange={(e) =>
                history.push(
                  `/deal/category/all/order/${e.target.value}/pageNumber/1`
                )
              }
            >
              <option value="newest">Newest Arrivals</option>
              <option value="bestselling">Best Selling</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="toprated">Avg. Rating</option>
            </select>
          </div>
        </div>
        {loading ? (
          <LoadingBox size="xl" />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product deal key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
