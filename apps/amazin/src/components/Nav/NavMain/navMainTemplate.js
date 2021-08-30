import { SORT } from 'src/constants';

export const navMainTemplate = [
  ['Netflux Video', '/video'],
  ['Top Deals', '/deal'],
  ['New Releases', '/search/category/All/order/' + SORT.NEWEST.OPT],
  ['Customer Service', '/customer'],
  ['Best Sellers', '/banner/bestseller']
];
