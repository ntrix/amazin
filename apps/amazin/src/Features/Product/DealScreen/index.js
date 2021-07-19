import React, { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import SortFilter from '../../../components/SortFilter';
import { listProducts } from '../../../Controllers/productActions';
import './dealScreen.css';

import MessageBox from '../../../components/MessageBox';
import Carousel, { dummyProducts, responsive } from '../../../constants';
import LoadingOrError from '../../../components/LoadingOrError';

export default function DealScreen() {
  const dispatch = useDispatch();
  const {
    category = 'Deals',
    order = 'bestselling',
    pageNumber = 1
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const [cat, setCat] = useState('Deals');
  let isMounted = true;

  useLayoutEffect(() => {
    if (isMounted)
      dispatch(
        listProducts({
          pageNumber,
          order,
          category: cat === 'Deals' ? '' : cat,
          deal: 1,
          pageSize: 990
        })
      ); // eslint-disable-next-line
    return () => (isMounted = false);
  }, [category, dispatch, order, pageNumber, cat]);

  return (
    <>
      <header className="screen__header">
        <ul className="cat-nav">
          <LoadingOrError statusOf={productCategoryList} />

          {productCategoryList.categories &&
            ['Deals', ...productCategoryList.categories].map((label, id) => (
              <li
                key={id}
                className={label === cat ? ' selected' : ''}
                onClick={() => setCat(label)}
              >
                {label}
              </li>
            ))}
        </ul>
      </header>

      <div
        className={'deal-screen' + (Math.random() < 0.5 ? '' : ' screen--1')}
      >
        <LoadingOrError statusOf={productList} />

        <MessageBox show={products?.length < 1}>
          No Deals On This Category!
        </MessageBox>
        {products && (
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
            removeArrowOnDeviceType={['mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {products.map((product, id) => (
              <ProductCard deal key={id} product={product}></ProductCard>
            ))}
          </Carousel>
        )}

        <h2 className="mh-2">Top Deals</h2>

        <div className="row top">
          <div className="row search__banner">
            <LoadingOrError statusOf={productList} />

            {products && (
              <div className="search__counter">
                {products.length} of {products.count} Results
              </div>
            )}

            <SortFilter
              order={order}
              getUrl={({ order: _order }) =>
                `/deal/category/all/order/${_order}/pageNumber/1`
              }
            />
          </div>

          <LoadingOrError xl statusOf={productList} />
          <MessageBox show={products?.length < 1}>No Product Found</MessageBox>

          <div className="row center">
            {(products || dummyProducts).map((product, id) => (
              <ProductCard deal key={id} product={product}></ProductCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
