import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import Rating from "../../components/Rating";
import SortFilter from "../../components/SortFilter";
import { listProducts } from "../../Controllers/productActions";
import { prices, ratings } from "../../constants";

export default function SearchScreen({ history }) {
  const {
    name = "All",
    category = "All",
    min = 0.01,
    max = 0,
    rating = 0,
    order = "bestselling",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages, count } = productList;

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList);

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "All" ? name : "",
        category: category !== "All" ? category : "",
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
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0.01 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div className="search-screen">
      <header className="screen__header">
        <ul className="cat-nav">
          <LoadingBox hide={!loadingCategories} />
          <MessageBox variant="danger" msg={errorCategories} />
          {categories &&
            ["All", ...categories].map((label, id) => (
              <Link to={getFilterUrl({ category: label })} key={id}>
                <li className={label === category ? " selected" : ""}>
                  {label}
                </li>
              </Link>
            ))}
        </ul>
      </header>
      <div className="row search__banner">
        <LoadingBox hide={!loading} />
        <MessageBox variant="danger" msg={error} />
        {products && (
          <div className="search__counter">
            {products.length} of {count} Results
          </div>
        )}
        <SortFilter order={order} getUrl={getFilterUrl} />
      </div>
      <div className="row top search-screen__result">
        <div className="search__filter">
          <ul>
            <h4>Department</h4>
            <div>
              <LoadingBox hide={!loadingCategories} />
              <MessageBox variant="danger" msg={errorCategories} />
              {categories && (
                <>
                  <li>
                    <Link
                      className={"All" === category ? "active" : ""}
                      to={getFilterUrl({ category: "All" })}
                    >
                      Any
                    </Link>
                  </li>
                  {categories.map((c, id) => (
                    <li key={id}>
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
              {prices.map((p, id) => (
                <li key={id}>
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
              {ratings.map((r, id) => (
                <li key={id}>
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
                  <LoadingBox xl />
                </div>
              </>
            ) : (
              <>
                <MessageBox variant="danger" msg={error} />
                {!products.length && (
                  <div className="placeholder">
                    <MessageBox show>No Product Found</MessageBox>
                  </div>
                )}
                {products &&
                  products.map((product, id) => (
                    <ProductCard key={id} product={product}></ProductCard>
                  ))}
              </>
            )}
            {(!products || products.length < 3) && (
              <div className="placeholder"></div>
            )}
            <div className="row divider-inner"></div>
            <Pagination page={page} pages={pages} getUrl={getFilterUrl} help />
          </div>
        </div>
      </div>
    </div>
  );
}
