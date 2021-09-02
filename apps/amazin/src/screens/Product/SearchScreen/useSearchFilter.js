import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { listProducts } from 'src/apis/productAPI';
import { NAV, SORT } from 'src/constants';

const BEST = SORT.BESTSELLING.OPT;
const FILTER = { name: NAV.ALL, category: NAV.ALL, min: 0.01, max: 0, rating: 0, order: BEST, pageNumber: 1 };

export function useSearchFilter() {
  const dispatch = useDispatch();
  const { name, category, min, max, rating, order, pageNumber } = { ...FILTER, ...useParams() };

  useEffect(() => {
    dispatch(listProducts({ pageNumber, min, max, rating, order, category, name }));
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) =>
    (({ page, category, name, rating, order, min, max }) => {
      const m01 = min || 0.01;
      return `/search/category/${category}/name/${name}/min/${m01}/max/${max}/rating/${rating}/order/${order}/pageNumber/${page}`;
    })({ page: pageNumber, category, name, rating, order, min, max, ...filter });

  return { category, max, rating, order, getFilterUrl };
}
