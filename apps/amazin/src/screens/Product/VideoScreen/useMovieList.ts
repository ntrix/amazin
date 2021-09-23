import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './videoScreen.css';
import { listExtMovies, listProducts } from 'src/apis/productAPI';
import { STORE, VIDEO } from 'src/constants';
import { useSafeState } from 'src/hooks/useSafeState';
import { dummyMovies } from 'src/utils';

export function useMovieList() {
  const dispatch = useDispatch();
  const productList: ProductListType = useSelector((state: AppState) => state.productList);
  const { products } = productList;
  const productCreate: ProductDetailType = useSelector((state: AppState) => state.productCreate);
  const [stockMovies, setStockMovies, isMounted] = useSafeState<MoviesOptList>({ [STORE]: dummyMovies });
  const [externMovies, setExternMovies] = useState<MoviesOptList>({ [STORE]: dummyMovies });
  const [bannerMovies, setBannerMovies] = useState<MoviesOpt<MovieType>>({});

  useEffect(() => {
    listExtMovies().then((movieList) => isMounted.current && setExternMovies(Object.fromEntries(movieList)));
  }, [isMounted]);

  useEffect(() => {
    if (products?.every(({ seller }) => seller?._id === VIDEO.SELLER)) setStockMovies({ [STORE]: products });
    else dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));
  }, [products, setStockMovies, dispatch]);

  useEffect(() => {
    if (!isMounted.current || externMovies[STORE] === dummyMovies || stockMovies[STORE] === dummyMovies) return;

    const bannerMoviesArray = VIDEO.GENRES.map((genre) => {
      const genreMovies = externMovies[genre] || (stockMovies[STORE] as MovieType[]);
      return [genre, genreMovies[(Math.random() * genreMovies.length) | 0]];
    });
    setBannerMovies(Object.fromEntries(bannerMoviesArray));
  }, [isMounted, externMovies, stockMovies, setBannerMovies]);

  return { productList, productCreate, externMovies, stockMovies, bannerMovies };
}
