import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import './videoScreen.css';
import { listProducts } from 'src/apis/productAPI';
import { STORE, IN_STOCK, VIDEO } from 'src/constants';
import { useSafeState } from 'src/hooks/useSafeState';
import { dummyMovies, sourceAdapter } from 'src/utils';

function fetchMovies() {
  const movieGenres = Object.keys(VIDEO.SRC);

  return Promise.all(
    movieGenres.map(async (genre) => {
      const { data } = await axios.get(VIDEO.URL + VIDEO.SRC[genre]).catch();
      return [genre, sourceAdapter(data.results)];
    })
  ).then(Object.fromEntries);
}

export function useMovieList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const [bannerMovies, setBannerMovies, isMounted] = useSafeState({});
  const [stockMovies, setStockMovies] = useState({ [IN_STOCK]: dummyMovies });
  const [externMovies, setExternMovies] = useState({ [STORE]: dummyMovies });

  useEffect(() => {
    fetchMovies().then((movies) => (isMounted.current ? setExternMovies(movies) : null));
    dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));
  }, [isMounted, dispatch]);

  useEffect(() => {
    if (!isMounted.current || stockMovies[IN_STOCK] !== dummyMovies) return;

    if (products?.[0].seller?._id === VIDEO.SELLER) setStockMovies({ [IN_STOCK]: products });
  }, [isMounted, products, stockMovies]);

  useEffect(() => {
    if (externMovies[STORE] === dummyMovies || stockMovies[IN_STOCK] === dummyMovies) return;

    const bannerMoviesArray = VIDEO.GENRES.map((genre) => {
      const genreMovies = externMovies[genre] || stockMovies[IN_STOCK];
      return [genre, genreMovies[(Math.random() * genreMovies.length) | 0]];
    });
    setBannerMovies(Object.fromEntries(bannerMoviesArray));
  }, [externMovies, stockMovies, setBannerMovies]);

  return { productList, productCreate, externMovies, stockMovies, bannerMovies };
}
