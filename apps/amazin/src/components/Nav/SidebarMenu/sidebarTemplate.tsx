import { SORT } from 'src/constants';
import { pipe, savePath } from 'src/utils';

export const sidebarBase = [
  ['Trending'],
  ['Best Sellers', '/banner/bestseller'],
  ['Top Deals', '/deal'],
  ['New Releases', '/search/category/All/order/' + SORT.NEWEST.OPT],
  ['Home Page', '/'],
  ['separator'],
  ['Categories'],
  ['Netflux Video', '/video']
];

export function sidebarCurrencyCreator(currency: CurrType = 'EUR') {
  return [
    ['separator'],
    ['Privacy & Setting'],
    ['Your Favorite List', 'disabled NOT IMPLEMENTED'],
    ['', '/currency/pCurrency/' + currency, 'sprite flag xl ' + currency, savePath('/curr')],
    [pipe.longName[currency], '/currency/pCurrency/' + currency, 'pl-8', savePath('/curr')],
    ['Currency Setting', '/currency/pCurrency/EUR', '', savePath('/curr')],
    ['Your Browsing History', 'disabled'],
    ['Shipping Address', '/shipping'],
    ['Orders & Returns', '/order-history'],
    ['Statistics / AB Testing', 'disabled NOT IMPLEMENTED'],
    ['FAQ & Help', '/contact/subject/FAQ'],
    [''],
    ['separator']
  ];
}

export function sidebarUserCreator(userName?: string, signOutAction?: FnType) {
  return [
    ['separator'],
    ['Your Account'],
    ['Your Profile', '/profile'],
    ['Customer Service', '/customer'],
    userName ? ['Sign Out', '#signout', '', signOutAction] : ['Sign In', '/signin'],
    [''],
    ['separator']
  ];
}

export function sidebarSellerCreator(isSeller?: boolean) {
  return [
    ['separator'],
    ['Seller Account'],
    ['Your Seller Profile', isSeller ? '/profile/seller' : 'disabled'],
    ['Your Listing Products', isSeller ? '/product-list' : 'disabled'],
    ['Your Order List', isSeller ? '/order-list' : 'disabled'],
    [''],
    ['separator']
  ];
}

export function sidebarAdminCreator(isAdmin?: boolean) {
  return [
    ['separator'],
    ['Administration'],
    ['User Management', isAdmin ? '/user-list' : 'disabled'],
    ['All Product Catalogues', isAdmin ? '/product-list' : 'disabled'],
    ['All Order Lists, Database', isAdmin ? '/order-list' : 'disabled'],
    [''],
    ['separator'],
    ['separator'],
    ['#contact developer', 'disabled'],
    [''],
    ['separator'],
    ['separator']
  ];
}
