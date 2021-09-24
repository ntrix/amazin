import { lazy, memo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';

import './dealScreen.css';
import { useShadow } from 'src/hooks/useShadow';
import { dummyMovies } from 'src/utils';
import { useDealScreen } from './useDealScreen';
import { CAROUSEL_CONFIG, NAV } from 'src/constants';
import { SusProductCard, SusProductList } from 'src/components/CustomSuspense';
import MessageBox from 'src/components/MessageBox';
import SearchBanner from 'src/components/Nav/SearchBanner';
import SubNavCategories from 'src/components/Nav/SubNavCategories';
import SortFilter from 'src/components/SortFilter';
const ProductCard: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ '../components/ProductCard'));

function DealScreen() {
  const { shadowOf } = useShadow();
  const { cat, banner, order, list, preloadCat, changeCat } = useDealScreen(useRef(''), useParams());
  const sortOrderUrl = ({ order: _order }: { order: string }) => `/deal/category/all/order/${_order}/pageNumber/1`;

  const Products = (list?.products || dummyMovies).map((product) => (
    <SusProductCard key={product._id} children={<ProductCard showDeal product={product} />} />
  ));

  return (
    <>
      <SubNavCategories first={NAV.DEAL} category={cat.current} changeCat={changeCat} onPreload={preloadCat} />
      <div className={`deal-screen ${banner.current}`}>
        <Carousel {...CAROUSEL_CONFIG} autoPlay={!shadowOf} children={Products} />

        <MessageBox msg={list?.products?.length < 1 && 'No Deals On This Category!'} />

        <h2 className="screen__title">Top Deals</h2>
        <div className="screen__featured">
          <SearchBanner list={list} children={<SortFilter order={order} getUrl={sortOrderUrl} />} />

          <SusProductList children={!!list?.products && Products} />
        </div>
      </div>
    </>
  );
}
export default memo(DealScreen);
