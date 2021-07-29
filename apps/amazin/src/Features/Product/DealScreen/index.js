import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SortFilter from '../../../components/SortFilter';
import { listProducts } from '../../../Controllers/productActions';
import './dealScreen.css';

import MessageBox from '../../../components/MessageBox';
import Carousel, { responsive, SORT } from '../../../constants';
import LoadingOrError from '../../../components/LoadingOrError';
import SubNavCategories from '../../Nav/SubNavCategories';
import SearchBanner from '../../Nav/SearchBanner';
import { loadingFallback } from '../../../components/Fallbacks';

const ProductCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../components/ProductCard')
);

export function _DealScreen() {
  const dispatch = useDispatch();
  const {
    category = 'Deals',
    order = SORT.BESTSELLING.OPT,
    pageNumber = 1
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const [cat, setCat] = useState('Deals');
  const randomBanner = useRef('');
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isMounted.current) return null;
    dispatch(
      listProducts({
        pageNumber,
        order,
        category: cat === 'Deals' ? '' : cat,
        deal: 1,
        pageSize: 990
      })
    );
    randomBanner.current = Math.random() < 0.5 ? 'screen--1' : '';
    return () => (isMounted.current = false);
  }, [category, dispatch, order, pageNumber, cat]);

  return (
    <>
      <SubNavCategories first="Deals" hook={{ category: cat, setCat }} />

      <div className={`deal-screen ${randomBanner.current}`}>
        <LoadingOrError statusOf={productList} />
        <MessageBox show={products?.length < 1}>
          No Deals On This Category!
        </MessageBox>

        {!!products && (
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
              <Suspense fallback={loadingFallback} key={id}>
                <ProductCard hasDeal product={product} />
              </Suspense>
            ))}
          </Carousel>
        )}

        <h2 className="mh-2">Top Deals</h2>

        <div className="row top">
          <SearchBanner>
            <SortFilter
              order={order}
              getUrl={({ order: _o }) =>
                `/deal/category/all/order/${_o}/pageNumber/1`
              }
            />
          </SearchBanner>

          <LoadingOrError xl statusOf={productList} />
          <MessageBox show={products?.length < 1}>No Product Found</MessageBox>

          <div className="row center">
            {products?.map((product, id) => (
              <Suspense key={id} fallback={loadingFallback}>
                <ProductCard hasDeal product={product} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const DealScreen = React.memo(_DealScreen);
export default DealScreen;
