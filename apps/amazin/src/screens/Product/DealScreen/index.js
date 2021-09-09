import { memo, lazy, useRef, useEffect } from 'react';

import './dealScreen.css';
import { dummyMovies } from 'src/utils';
import { useShadow } from 'src/hooks/useShadow';
import Carousel, { responsive, NAV } from 'src/constants';
import { useDealScreen } from './useDealScreen';
import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import SortFilter from 'src/components/SortFilter';
import MessageBox from 'src/components/MessageBox';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SearchBanner from 'src/components/Nav/SearchBanner';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ '../components/ProductCard'));

function DealScreen() {
  const banner = useRef('');
  const { shadowOf } = useShadow();
  const { paramCat, list, order, cat, changeCat, preloadCat } = useDealScreen();

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [cat, paramCat, order]);

  return (
    <>
      <SubNavCategories first={NAV.DEAL} category={cat.current} changeCat={changeCat} onPreload={preloadCat} />
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
            <SusProductCard key={id} children={<ProductCard hasDeal product={product} />} />
          ))}
        </Carousel>

        <MessageBox msg={list?.products?.length < 1 && 'No Deals On This Category!'} />

        <h2 className="screen__title">Top Deals</h2>
        <div className="screen__featured">
          <SearchBanner list={list}>
            <SortFilter order={order} getUrl={({ order: _o }) => `/deal/category/all/order/${_o}/pageNumber/1`} />
          </SearchBanner>

          <div className="row center">
            <SusProductList>
              {list?.products?.map((product, id) => (
                <SusProductCard key={id} children={<ProductCard hasDeal product={product} />} />
              ))}
            </SusProductList>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(DealScreen);
