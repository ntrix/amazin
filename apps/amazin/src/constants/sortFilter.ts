import { NAV } from './nav';

const BESTSELLING = 'bestselling';

/* Sort filter */
export const SORT = {
  NEWEST: { OPT: 'newest', LABEL: 'Newest Arrivals' },
  BESTSELLING: { OPT: BESTSELLING, LABEL: 'Best Selling' },
  LOWEST: { OPT: 'lowest', LABEL: 'Price: Low to High' },
  HIGHEST: { OPT: 'highest', LABEL: 'Price: High to Low' },
  TOPRATED: { OPT: 'toprated', LABEL: 'Avg. Rating' },

  DEFAULT_FILTER: {
    name: NAV.ALL,
    category: NAV.ALL,
    order: BESTSELLING,
    min: 0.01,
    max: 0,
    rating: 0,
    pageNumber: 1
  } as FilterOptType
};
