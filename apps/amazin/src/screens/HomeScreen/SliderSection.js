import { memo } from 'react';
import { useSelector } from 'react-redux';

import { Suspense } from 'src/components/CustomSuspense';
import { DUMMYSELLERS, SWIPER_CONFIG } from 'src/constants';
import SwiperCore, { Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import SellerSlide from './SellerSlide';

SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

const SwiperFallBack = <div className="swiper-container" />;

function SliderSection() {
  const { users: sellers, loading, error } = useSelector((state) => state.userTopSellersList);

  return (
    <Suspense fallback={SwiperFallBack}>
      <Swiper {...SWIPER_CONFIG}>
        {(sellers || DUMMYSELLERS).map((seller, id) => (
          <SwiperSlide key={id} children={<SellerSlide seller={seller} />} />
        ))}
      </Swiper>
      <MessageBox hide={sellers?.length < 1}>No Seller Found</MessageBox>
      <LoadingOrError statusOf={{ loading, error }} />
    </Suspense>
  );
}

export default memo(SliderSection);
