import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import './videoScreen.css';
import { listProducts } from 'src/apis/productAPI';
import { STORE, VIDEO } from 'src/constants';
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
  const [stockMovies, setStockMovies, isMounted] = useSafeState({ [STORE]: dummyMovies });
  const [externMovies, setExternMovies] = useState({ [STORE]: dummyMovies });
  const [bannerMovies, setBannerMovies] = useState({});

  useEffect(() => {
    fetchMovies().then((movies) => (isMounted.current ? setExternMovies(movies) : null));
  }, [isMounted]);

  useEffect(() => {
    if (products?.[9].seller?._id === VIDEO.SELLER) setStockMovies({ [STORE]: products });
    else dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));
  }, [products, setStockMovies, dispatch]);

  useEffect(() => {
    if (!isMounted.current || externMovies[STORE] === dummyMovies || stockMovies[STORE] === dummyMovies) return;

    const bannerMoviesArray = VIDEO.GENRES.map((genre) => {
      const genreMovies = externMovies[genre] || stockMovies[STORE];
      return [genre, genreMovies[(Math.random() * genreMovies.length) | 0]];
    });
    setBannerMovies(Object.fromEntries(bannerMoviesArray));
  }, [isMounted, externMovies, stockMovies, setBannerMovies]);

  return { productList, productCreate, externMovies, stockMovies, bannerMovies };
}
