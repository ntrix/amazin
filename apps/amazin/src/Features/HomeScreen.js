import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { listProducts } from '../Controllers/productActions';
import { listTopSellers } from '../Controllers/userActions';
import SwiperCore, {
  Navigation,
  EffectCoverflow,
  Scrollbar,
  Autoplay,
  Pagination
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import MessageBox from '../components/MessageBox';
import { DUMMYSELLERS } from '../constants';
import LoadingOrError from '../components/LoadingOrError';
import { loadingFallback } from '../components/Fallbacks';

import 'swiper/swiper-bundle.css';
import { LazyImg } from '../utils/suspenseClient';
const ProductCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ './Product/components/ProductCard')
);

SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

export function _HomeScreen() {
  const dispatch = useDispatch();
  const { banner = 'home' } = useParams();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { users: sellers } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({ pageSize: 12 }));
    dispatch(listTopSellers());
  }, [dispatch]);

  return (
    <div className="home-screen">
      <div className={`home__banner ${banner}`}></div>
      <h2 className="home-screen__title">Top Sellers, Top Products</h2>

      <div>
        <Suspense fallback={<div className="swiper-container" />}>
          <Swiper
            spaceBetween={20}
            navigation
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            autoplay={{
              delay: 5000,
              disableOnInteraction: true
            }}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false
            }}
            pagination={{
              clickable: true
            }}
          >
            {(sellers || DUMMYSELLERS).map((seller, id) => (
              <SwiperSlide key={id}>
                <Suspense fallback={<h4>Top Seller</h4>}>
                  <Link className="seller__card" to={`/seller/${seller._id}`}>
                    <LazyImg
                      className="seller__img"
                      src={seller.seller.logo}
                      alt={seller.seller.name}
                    />
                    <p className="legend">{seller.seller.name}</p>
                  </Link>
                </Suspense>
              </SwiperSlide>
            ))}
          </Swiper>
          <MessageBox hide={sellers?.length < 1}>No Seller Found</MessageBox>
          <LoadingOrError statusOf={userTopSellersList} />
        </Suspense>
      </div>

      <h2 className="screen__title">Featured Products</h2>

      <LoadingOrError xl statusOf={productList} />
      <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

      <div className="screen__featured">
        <Suspense fallback={loadingFallback}>
          {products?.map((product) => (
            <Suspense fallback={loadingFallback} key={product._id}>
              <ProductCard product={product} />
            </Suspense>
          ))}
        </Suspense>
      </div>
    </div>
  );
}

const HomeScreen = React.memo(_HomeScreen);
export default HomeScreen;
