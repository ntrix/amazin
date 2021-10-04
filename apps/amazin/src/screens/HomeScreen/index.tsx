import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from 'src/apis/productAPI';
import { listTopSellers } from 'src/apis/userAPI';
import Header from 'src/layouts/Header';
import FeaturedSection from 'src/components/HomeScreen/FeaturedSection';
import SliderSection from 'src/components/HomeScreen/SliderSection';

function HomeScreen() {
  const dispatch = useDispatch();
  const { banner = 'home' }: { banner?: string } = useParams();
  const sellerList: UserListType = useSelector((state: AppState) => state.userTopSellersList);
  const productList: ProductListType = useSelector((state: AppState) => state.productList);

  useEffect(() => {
    dispatch(listTopSellers());
    dispatch(listProducts({ pageSize: 12 }));
  }, [dispatch]);

  return (
    <div className="home-screen">
      <div className={`home__banner ${banner}`}></div>
      <Header title className="home-screen__title" label="Top Sellers, Top Products" />
      <SliderSection {...sellerList} />
      <FeaturedSection {...productList} />
    </div>
  );
}

export default memo(HomeScreen);
