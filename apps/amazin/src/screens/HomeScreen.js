import { lazy, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import SwiperCore, { Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Suspense, SuspenseLoad, SuspenseSeller } from 'src/components/CustomSuspense';
import { listProducts } from 'src/apis/productAPI';
import { listTopSellers } from 'src/apis/userAPI';
import { LazyImg } from 'src/apis/suspenseAPI';
import { DUMMYSELLERS } from 'src/constants';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ './Product/components/ProductCard'));
SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

function HomeScreen() {
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
            {(sellers || DUMMYSELLERS).map(({ seller: { logo, name }, _id }, key) => (
              <SwiperSlide key={key}>
                <SuspenseSeller>
                  <Link className="seller__card" to={`/seller/${_id}`}>
                    <LazyImg className="seller__img" src={logo} alt={name} />
                    <p className="legend">{name}</p>
                  </Link>
                </SuspenseSeller>
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
        <SuspenseLoad>
          {products?.map((product) => (
            <SuspenseLoad key={product._id} children={<ProductCard product={product} />} />
          ))}
        </SuspenseLoad>
      </div>
    </div>
  );
}

export default memo(HomeScreen);
