import { memo } from 'react';
import { useSelector } from 'react-redux';

import { Suspense } from 'src/components/CustomSuspense';
import { DUMMY_SELLERS, SWIPER_CONFIG } from 'src/constants';
import SwiperCore, { Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LoadingOrError from 'src/components/LoadingOrError';
import MessageBox from 'src/components/MessageBox';
import SellerSlide from './SellerSlide';

SwiperCore.use([Navigation, EffectCoverflow, Scrollbar, Autoplay, Pagination]);

const SwiperFallBack = <div className="swiper-container" />;

function SliderSection() {
  const {
    users: sellers,
    loading,
    error
  }: { users: UserType[] } & StatusType = useSelector((state: AppState) => state.userTopSellersList);

  return (
    <Suspense fallback={SwiperFallBack}>
      <Swiper {...SWIPER_CONFIG} effect="coverflow" slidesPerView="auto">
        {(sellers || DUMMY_SELLERS).map((user: UserType, id: number) => (
          <SwiperSlide key={id} children={<SellerSlide user={user} />} />
        ))}
      </Swiper>
      <MessageBox show={sellers?.length < 1}>No Seller Found</MessageBox>
      <LoadingOrError statusOf={{ loading, error }} />
    </Suspense>
  );
}

export default memo(SliderSection);
