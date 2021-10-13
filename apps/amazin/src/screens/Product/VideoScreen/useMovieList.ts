import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './videoScreen.css';
import { listExtMovies, listProducts } from 'src/apis/productAPI';
import { MoviesOpt, MoviesOptList, STORE, VIDEO, VideoType } from 'src/constants';
import { useSafeState } from 'src/hooks/useSafeState';
import { dummyMovies } from 'src/utils';

export function useStockMovies() {
  const dispatch = useDispatch();
  const productList: ProductListType = useSelector((state: AppState) => state.productList);
  const { products } = productList;
  const productCreate: ProductDetailType = useSelector((state: AppState) => state.productCreate);
  const [stockMovies, setStockMovies] = useSafeState<MoviesOptList>({ [STORE]: dummyMovies });

  useEffect(() => {
    if (products?.every(({ seller }) => seller?._id === VIDEO.SELLER)) {
      setStockMovies({ [STORE]: products });
      return;
    }
    dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));
  }, [products, setStockMovies, dispatch]);

  return { productList, productCreate, stockMovies };
}

export function useExternMovies(): {externMovies: error;
}  {
  const [externMovies, setExternMovies] = useSafeState<MoviesOptList>({ [STORE]: dummyMovies });

  useEffect(() => {
    listExtMovies().then((movieList) => setExternMovies(Object.fromEntries(movieList)));
  }, [setExternMovies]);

  return { externMovies };
}

export function useBannerMovies(stockMovies: MoviesOptList): {externMovies: error;
bannerMovies: error;
}  {
  const [bannerMovies, setBannerMovies, isMounted] = useSafeState<MoviesOpt<VideoType & ProductType>>({});
  const { externMovies } = useExternMovies();

  useEffect(() => {
    if (!isMounted.current || externMovies[STORE] === dummyMovies || stockMovies[STORE] === dummyMovies) return;

    const bannerMoviesArray = VIDEO.GENRES.map((genre) => {
      const genreMovies = externMovies[genre] || (stockMovies[STORE] as (VideoType & ProductType)[]);
      return [genre, genreMovies[(Math.random() * genreMovies.length) | 0]];
    });
    setBannerMovies(Object.fromEntries(bannerMoviesArray));
  }, [isMounted, externMovies, stockMovies, setBannerMovies]);

  return { externMovies, bannerMovies };
}
