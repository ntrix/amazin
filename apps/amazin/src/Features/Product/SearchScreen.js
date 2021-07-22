import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Pagination from '../../components/Pagination';
import ProductCard from '../../components/ProductCard';
import Rating from '../../components/Rating';
import SortFilter from '../../components/SortFilter';
import { listProducts } from '../../Controllers/productActions';

import MessageBox from '../../components/MessageBox';
import { NAV, prices, ratings } from '../../constants';
import LoadingOrError from '../../components/LoadingOrError';

export default function SearchScreen() {
  const dispatch = useDispatch();
  const {
    name = NAV.ALL,
    category = NAV.ALL,
    min = 0.01,
    max = 0,
    rating = 0,
    order = 'bestselling',
    pageNumber = 1
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { products, page, pages, count } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        min,
        max,
        rating,
        order,
        category,
        name
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min || (filter.min === 0 ? 0.01 : min);
    const filterMax = filter.max || (filter.max === 0 ? 0 : max);
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div className="search-screen">
      <header className="screen__header">
        <ul className="cat-nav">
          <LoadingOrError statusOf={productCategoryList} />

          {categories &&
            [NAV.ALL, ...categories].map((label, id) => (
              <Link to={getFilterUrl({ category: label })} key={id}>
                <li className={label === category ? ' selected' : ''}>
                  {label}
                </li>
              </Link>
            ))}
        </ul>
      </header>

      <div className="row search__banner">
        <LoadingOrError statusOf={productList} />

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
              <LoadingOrError statusOf={productCategoryList} />

              <li>
                <Link
                  className={NAV.ALL === category ? ' active' : ''}
                  to={getFilterUrl({ category: NAV.ALL })}
                >
                  Any
                </Link>
              </li>

              {categories?.map((_cat, id) => (
                <li key={id}>
                  <Link
                    className={_cat === category ? ' active' : ''}
                    to={getFilterUrl({ category: _cat })}
                  >
                    {_cat}
                  </Link>
                </li>
              ))}
            </div>

            <br />
            <h4>Price</h4>
            <div>
              {prices.map((p, id) => (
                <li key={id}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? ' active' : ''
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
                    className={`${r.rating}` === `${rating}` ? ' active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
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

            <LoadingOrError xl wrapClass="placeholder" statusOf={productList} />
            {!productList.loading && (
              <>
                <MessageBox wrapClass="placeholder" show={!products.length}>
                  No Product Found
                </MessageBox>

                {products?.map((product, id) => (
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
