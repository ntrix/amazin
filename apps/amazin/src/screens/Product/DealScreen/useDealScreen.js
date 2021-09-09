import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSafeState } from 'src/hooks/useSafeState';
import { useDebounce } from 'src/hooks/useDebounce';
import { listProducts } from 'src/apis/productAPI';
import { NAV, SORT } from 'src/constants';

export function useDealScreen(cat, param) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const preloadingCat = useRef('');
  const [list, setList] = useSafeState(null);
  const { category: paramCat = NAV.DEAL, order = SORT.BESTSELLING.OPT, pageNumber = 1 } = param;

  const _preload = (c) => {
    dispatch(listProducts({ pageNumber, order, category: c === NAV.DEAL ? '' : c, deal: 1, pageSize: 990 }));
    preloadingCat.current = c;
  };

  const [debouncePreload] = useDebounce(_preload);

  const preloadCat = useCallback((category) => (list ? debouncePreload(category) : null), [list, debouncePreload]);

  const changeCat = useCallback(
    (category) => {
      cat.current = category;
      setList(preloadingCat.current !== category ? null : productList);
      if (preloadingCat.current !== category) debouncePreload(category);
    },
    [cat, productList, setList, debouncePreload]
  );

  useEffect(() => {
    if (!cat.current) changeCat(paramCat);
    if (productList.success && cat.current === preloadingCat.current) setList(productList);
  }, [cat, paramCat, preloadingCat, productList, setList, changeCat]);

  return { order, list, changeCat, preloadCat };
}
