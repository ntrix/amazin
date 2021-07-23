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
import 'swiper/swiper-bundle.css';

import MessageBox from '../components/MessageBox';
import { dummySellers } from '../constants';
import LoadingOrError from '../components/LoadingOrError';
import { loadingFallback } from '../components/Fallbacks';
const ProductCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../components/ProductCard')
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
        <Swiper
          spaceBetween={20}
          navigation
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          autoplay={{
            delay: 2500,
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
          <LoadingOrError statusOf={userTopSellersList} />
          <MessageBox hide={sellers?.length < 1}>No Seller Found</MessageBox>

          {(sellers || dummySellers).map((seller, id) => (
            <SwiperSlide key={id}>
              <Link className="seller__card" to={`/seller/${seller._id}`}>
                <img
                  className="seller__img"
                  src={seller.seller.logo}
                  alt={seller.seller.name}
                />
                <p className="legend">{seller.seller.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className="home-screen__title-2">Featured Products</h2>

      <LoadingOrError xl statusOf={productList} />
      <MessageBox hide={products?.length < 1}>No Product Found</MessageBox>

      <div className="row center">
        {products?.map((product) => (
          <Suspense fallback={loadingFallback} key={product._id}>
            <ProductCard product={product} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

const HomeScreen = React.memo(_HomeScreen);
export default HomeScreen;
