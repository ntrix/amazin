import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
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

SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

export default function HomeScreen() {
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
    <div className={'home-screen'}>
      <div className={'home__banner ' + banner}></div>
      <h2 className="home-screen__title">Top Sellers, Top Products</h2>
      {/* <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={breakpoints}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="transform 1000ms ease-in-out"
            transitionDuration={1000}
            centerMode={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "desktop"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link className="seller__card" to={`/seller/${seller._id}`}>
                  <img
                    className="seller__img"
                    src={seller.seller.logo || ""}
                    alt={seller.seller.name || "Anonymous Seller"}
                  />
                  <p className="legend">
                    {seller.seller.name || "Anonymous Seller"}
                  </p>
                </Link>
              </div>
            ))}
          </Carousel> */}
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
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
}