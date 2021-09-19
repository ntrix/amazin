import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSafeState } from 'src/hooks/useSafeState';
import { useDebounce } from 'src/hooks/useDebounce';
import { listProducts } from 'src/apis/productAPI';
import { NAV, SORT } from 'src/constants';

export function usePreload(list: ProductListType, param: { order?: string; pageNumber?: string }) {
  const dispatch = useDispatch();
  const preloadingCat = useRef('');
  const { order = SORT.BESTSELLING.OPT, pageNumber = '1' } = param;

  const _preload = (c: string) => {
    dispatch(listProducts({ pageNumber, order, category: c === NAV.DEAL ? '' : c, deal: 1, pageSize: 990 }));
    preloadingCat.current = c;
  };

  const [debouncePreload] = useDebounce(_preload);

  const preloadCat = useCallback(
    (category: string) => (list ? debouncePreload(category) : null),
    [list, debouncePreload]
  );

  return { order, preloadingCat, preloadCat, debouncePreload };
}

export function useDealScreen(cat: Ref<string>, param: { category: string; order: string; pageNumber: string }) {
  const { category: paramCat = NAV.DEAL } = param;
  const productList: ProductListType = useSelector((state: AppState) => state.productList);
  const [list, setList] = useSafeState(productList);
  const banner = useRef('');
  const { order, preloadingCat, preloadCat, debouncePreload } = usePreload(list, param);

  useEffect(() => {
    banner.current = Math.random() < 0.5 ? 'screen--1' : '';
  }, [cat, param]);

  const changeCat = useCallback(
    (category: string) => {
      cat.current = category;
      setList(preloadingCat.current !== category ? null : productList);
      if (preloadingCat.current !== category) debouncePreload(category);
    },
    [cat, preloadingCat, productList, setList, debouncePreload]
  );

  useEffect(() => {
    if (!cat.current) changeCat(paramCat);
    if (productList.success && cat.current === preloadingCat.current) setList(productList);
  }, [cat, paramCat, preloadingCat, productList, setList, changeCat]);

  return { cat, banner, order, list, changeCat, preloadCat };
}
