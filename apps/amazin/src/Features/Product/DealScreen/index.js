import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
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
import { dummyMovies } from '../../../utils';
import { useDebounce } from '../../../utils/useDebounce';

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

  const [products, setProducts] = useState(dummyMovies);
  const [cat, setCat] = useState('');
  const preCache = useRef({ cat: '', productList: {}, banner: '' });

  const _preload = (_preCategory) => {
    dispatch(
      listProducts({
        pageNumber,
        order,
        category: _preCategory === 'Deals' ? '' : _preCategory,
        deal: 1,
        pageSize: 990
      })
    );
    preCache.current.cat = _preCategory;
  };
  const debouncePreload = useDebounce(_preload, 500);

  const changeCategory = useCallback(
    (_cat) => {
      if (preCache.current.cat !== _cat) debouncePreload(_cat);
      preCache.current.loadingOrError = productList;
      setCat(_cat);
    },
    [productList, debouncePreload]
  );

  useEffect(() => {
    preCache.current.banner = Math.random() < 0.5 ? 'screen--1' : '';
    if (!cat) changeCategory(category);
  }, [cat, category, order, pageNumber, changeCategory]);

  useEffect(() => {
    if (!productList.success || cat !== preCache.current.cat) return;
    preCache.current.loadingOrError = {};
    setProducts(productList.products);
  }, [cat, productList, preCache]);

  return (
    <>
      <SubNavCategories
        first="Deals"
        category={cat}
        changeCategory={changeCategory}
        onPreload={(_cat) => debouncePreload(_cat)}
      />

      <div className={`deal-screen ${preCache.current.banner}`}>
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
              <LoadingOrError statusOf={preCache.current.loadingOrError} />
              <ProductCard hasDeal product={product} />
            </Suspense>
          ))}
        </Carousel>

        <MessageBox show={products?.length < 1}>
          No Deals On This Category!
        </MessageBox>

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
