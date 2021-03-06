import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { listProducts } from "../../Controllers/productActions";

import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Product from "../../components/Product";
import Rating from "../../components/Rating";
import { prices, ratings } from "../../utils";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, count } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div>
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
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="bestselling">Best Selling</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Rating</option>
          </select>
        </div>
      </div>
      <div className="row top">
        <div className="search__filter">
          <ul>
            <h4>Department</h4>
            <div>
              {loadingCategories ? (
                <LoadingBox />
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                <>
                  <li>
                    <Link
                      className={"all" === category ? "active" : ""}
                      to={getFilterUrl({ category: "all" })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? "active" : ""}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </div>
            <br />
            <h4>Price</h4>
            <div>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </div>
            <br />
            <h4>Avg. Customer Review</h4>
            <div>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <div className="col-9">
          <div className="row center search__results">
            {(!products || products.length < 2) && (
              <div className="placeholder"></div>
            )}
            {loading ? (
              <>
                <div className="placeholder">
                  <LoadingBox size="xl" />
                </div>
              </>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : !products.length ? (
              <>
                <div className="placeholder">
                  <MessageBox>No Product Found</MessageBox>
                </div>
              </>
            ) : (
              <>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </>
            )}
            {(!products || products.length < 3) && (
              <div className="placeholder"></div>
            )}
            <div className="row center pagination">
              {[...Array(pages || 0).keys()].map((x) => (
                <Link
                  className={x + 1 === page ? "active" : ""}
                  key={x + 1}
                  to={getFilterUrl({ page: x + 1 })}
                >
                  {x + 1}
                </Link>
              ))}
            </div>
            <p className="separator"></p>
            <p className="separator"></p>
            <div>
              <h2>Do you need help?</h2>
              <p>
                Visit the <Link to="/help">help section</Link> or{" "}
                <Link to="/contact/subject/Help">contact us</Link>
              </p>
            </div>
            <p className="separator"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
