import { NAV } from './nav';

const BESTSELLING = 'bestselling';

export type FilterStringType = Record<'seller' | 'name' | 'category' | 'order', string>;

export type FilterNumberType = Record<'pageSize' | 'pageNumber' | 'deal' | 'min' | 'max' | 'rating', string | number>;

export type FilterOptType = Partial<FilterStringType & FilterNumberType>;

/* Sort filter */
export const SORT = {
  NEWEST: { OPT: 'newest', LABEL: 'Newest Arrivals' },
  BESTSELLING: { OPT: BESTSELLING, LABEL: 'Best Selling' },
  LOWEST: { OPT: 'lowest', LABEL: 'Price: Low to High' },
  HIGHEST: { OPT: 'highest', LABEL: 'Price: High to Low' },
  TOPRATED: { OPT: 'toprated', LABEL: 'Avg. Rating' }
};

export const SORT_DEFAULT_FILTER: FilterOptType = {
  name: NAV.ALL,
  category: NAV.ALL,
  order: BESTSELLING,
  min: 0.01,
  max: 0,
  rating: 0,
  pageNumber: 1
};
