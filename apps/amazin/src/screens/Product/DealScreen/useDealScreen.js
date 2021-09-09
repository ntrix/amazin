import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { listProducts } from 'src/apis/productAPI';
import { useDebounce } from 'src/hooks/useDebounce';
import { useSafeState } from 'src/hooks/useSafeState';
import { NAV, SORT } from 'src/constants';

export function useDealScreen() {
  const dispatch = useDispatch();
  const { category: paramCat = NAV.DEAL, order = SORT.BESTSELLING.OPT, pageNumber = 1 } = useParams();
  const productList = useSelector((state) => state.productList);
  const [list, setList] = useSafeState(productList);
  const banner = useRef('');
  const cat = useRef('');
  const preloadingCat = useRef('');

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [cat, paramCat, order, pageNumber]);

  const _preload = (c) => {
    dispatch(listProducts({ pageNumber, order, category: c === NAV.DEAL ? '' : c, deal: 1, pageSize: 990 }));
    preloadingCat.current = c;
  };
  const [debouncePreload] = useDebounce(_preload);

  const changeCat = useCallback(
    (category) => {
      cat.current = category;
      setList(preloadingCat.current !== category ? null : productList);
      if (preloadingCat.current !== category) debouncePreload(category);
    },
    [productList, setList, debouncePreload]
  );

  useEffect(() => {
    if (!cat.current) changeCat(paramCat);
    if (productList.success && cat.current === preloadingCat.current) setList(productList);
  }, [productList, setList, preloadingCat, cat, paramCat, changeCat]);

  const preloadCat = useCallback((category) => (list ? debouncePreload(category) : null), [list, debouncePreload]);

  return { list, order, banner, cat, changeCat, preloadCat };
}
