import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import './videoScreen.css';
import { listProducts } from 'src/apis/productAPI';
import { IN_STOCK, VIDEO } from 'src/constants';
import { useSafeState } from 'src/hooks/useSafeState';
import { sourceAdapter } from 'src/utils';

export function useMovieList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, success } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const [externMovies, setExternMovies] = useSafeState({});
  const [stockMovies, setStockMovies] = useSafeState({ [IN_STOCK]: [] });
  const [bannerMovies, setBannerMovies] = useSafeState([]);

  useEffect(() => {
    const _banner = {};
    VIDEO.GENRES.forEach((_genre) => {
      const genreMovies = !success ? VIDEO.EMPTY : externMovies[_genre] || stockMovies[IN_STOCK] || VIDEO.EXAMPLES;
      _banner[_genre] = genreMovies[(Math.random() * genreMovies.length) | 0];
    });
    setBannerMovies(_banner);
  }, [success, setBannerMovies, externMovies, stockMovies]);

  useEffect(() => {
    dispatch(listProducts({ seller: VIDEO.SELLER, category: 'Video', pageSize: 11, order: 'oldest' }));

    (async function fetchData() {
      const _movieList = {};
      await Promise.all(
        Object.keys(VIDEO.SRC).map(async (genre) => {
          const { data } = await axios.get(VIDEO.URL + VIDEO.SRC[genre]).catch();
          _movieList[genre] = sourceAdapter(data.results);
        })
      );
      setExternMovies(_movieList);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (products) setStockMovies({ [IN_STOCK]: products.filter((p) => p.seller._id === VIDEO.SELLER) });
  }, [products, setStockMovies]);

  return { stockList: productList, productCreate, externMovies, stockMovies, bannerMovies };
}
