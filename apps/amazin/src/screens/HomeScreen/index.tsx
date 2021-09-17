import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from 'src/apis/productAPI';
import { listTopSellers } from 'src/apis/userAPI';
import Header from 'src/layouts/Header';
import FeaturedSection from './FeaturedSection';
import SliderSection from './SliderSection';

function HomeScreen() {
  const dispatch = useDispatch();
  const { banner = 'home' }: { banner?: string } = useParams();

  useEffect(() => {
    dispatch(listTopSellers());
    dispatch(listProducts({ pageSize: 12 }));
  }, [dispatch]);

  return (
    <div className="home-screen">
      <div className={`home__banner ${banner}`}></div>
      <Header title className="home-screen__title" label="Top Sellers, Top Products" />
      <SliderSection />
      <FeaturedSection />
    </div>
  );
}

export default memo(HomeScreen);
