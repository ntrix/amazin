import { lazy, memo, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import './dealScreen.css';
import { useShadow } from 'src/hooks/useShadow';
import { dummyMovies } from 'src/utils';
import { useDealScreen } from './useDealScreen';
import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import Carousel, { NAV, responsive } from 'src/constants';
import MessageBox from 'src/components/MessageBox';
import SearchBanner from 'src/components/Nav/SearchBanner';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SortFilter from 'src/components/SortFilter';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ '../components/ProductCard'));

function DealScreen() {
  const param = useParams();
  const banner = useRef('');
  const cat = useRef('');
  const { shadowOf } = useShadow();
  const { order, list, preloadCat, changeCat } = useDealScreen(cat, param);

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [cat, param]);

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
            <SusProductCard key={id} children={<ProductCard showDeal product={product} />} />
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
                <SusProductCard key={id} children={<ProductCard showDeal product={product} />} />
              ))}
            </SusProductList>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(DealScreen);
