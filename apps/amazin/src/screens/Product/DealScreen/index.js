import { lazy, memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './dealScreen.css';
import { listProducts } from 'src/apis/productAPI';
import { SuspenseLoad } from 'src/components/CustomSuspense';
import { dummyMovies } from 'src/utils';
import { useDebounce } from 'src/hooks/useDebounce';
import { useShadow } from 'src/hooks/useShadow';
import { useSafeState } from 'src/hooks/useSafeState';
import Carousel, { responsive, NAV, SORT } from 'src/constants';
import SortFilter from 'src/components/SortFilter';
import MessageBox from 'src/components/MessageBox';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SearchBanner from 'src/components/Nav/SearchBanner';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ '../components/ProductCard'));

function DealScreen() {
  const dispatch = useDispatch();
  const { category: paramCat = NAV.DEAL, order = SORT.BESTSELLING.OPT, pageNumber = 1 } = useParams();
  const productList = useSelector((state) => state.productList);
  const { shadowOf } = useShadow();
  const [list, setList] = useSafeState(null);
  const banner = useRef('');
  const category = useRef('');
  const preloadingCat = useRef('');

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [category, paramCat, order, pageNumber]);

  const _preload = (_category) => {
    dispatch(
      listProducts({
        pageNumber,
        order,
        category: _category === NAV.DEAL ? '' : _category,
        deal: 1,
        pageSize: 990
      })
    );
    preloadingCat.current = _category;
  };
  const [debouncePreload] = useDebounce(_preload);

  const changeCategory = useCallback(
    (_cat) => {
      category.current = _cat;
      setList(preloadingCat.current !== _cat ? null : productList);
      if (preloadingCat.current !== _cat) debouncePreload(_cat);
    },
    [productList, setList, debouncePreload]
  );

  useEffect(() => {
    if (!category.current) changeCategory(paramCat);
    if (productList.success && category.current === preloadingCat.current) setList(productList);
  }, [productList, setList, preloadingCat, category, paramCat, changeCategory]);

  return (
    <>
      <SubNavCategories
        first={NAV.DEAL}
        category={category.current}
        changeCategory={changeCategory}
        onPreload={(_cat) => (list ? debouncePreload(_cat) : null)}
      />
      <div className={`deal-screen ${banner.current}`}>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={!shadowOf}
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
          {(list?.products || dummyMovies).map((product, id) => (
            <SuspenseLoad key={id} children={<ProductCard hasDeal product={product} />} />
          ))}
        </Carousel>

        <MessageBox show={list?.products?.length < 1}>No Deals On This Category!</MessageBox>

        <h2 className="screen__title">Top Deals</h2>
        <div className="screen__featured">
          <SearchBanner info={list}>
            <SortFilter order={order} getUrl={({ order: _o }) => `/deal/category/all/order/${_o}/pageNumber/1`} />
          </SearchBanner>

          <div className="row center">
            {list?.products?.map((product, id) => (
              <SuspenseLoad key={id} children={<ProductCard hasDeal product={product} />} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(DealScreen);
