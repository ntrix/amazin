import { SORT } from '../../../constants';
import { pipe, savePath } from '../../../utils';

export const sidebarMenuTemplate = [
  ['Trending'],
  ['Best Sellers', '/banner/bestseller'],
  ['Top Deals', '/deal'],
  ['New Releases', '/search/category/All/order/' + SORT.NEWEST.OPT],
  ['Home Page', '/'],
  ['separator'],
  ['Categories'],
  ['Netflux Video', '/video']
];

export const sidebarItemAdapter = (cat) => [cat, '/search/category/' + cat];

export function sidebarMenuCreator(currency, userInfo, signOutAction) {
  currency = currency || userInfo?.currency || 'EUR';

  return [
    ['separator'],
    ['Privacy & Setting'],
    ['Your Favorite List', 'disabled'],
    [
      '',
      '/currency/cType/' + currency,
      'sprite flag xl ' + currency,
      savePath('/curr')
    ],
    [
      pipe.longName[currency],
      '/currency/cType/' + currency,
      'pl-8',
      savePath('/curr')
    ],
    ['Currency Setting', '/currency/cType/EUR', '', savePath('/curr')],
    ['Your Browsing History', 'disabled'],
    ['Shipping Address', '/shipping'],
    ['Orders & Returns', '/order-history'],
    ['Statistics / AB Testing', 'disabled'],
    ['FAQ & Help', '/contact/subject/FAQ'],
    [''],
    ['separator'],
    ['separator'],
    ['Your Account'],
    ['Your Profile', '/profile'],
    ['Customer Service', '/customer'],
    userInfo
      ? ['Sign Out', '#signout', '', signOutAction]
      : ['Sign In', '/signin'],
    [''],
    ['separator'],
    ['separator'],
    ['Seller Account'],
    [
      'Your Seller Profile',
      userInfo?.isSeller ? '/profile/seller' : 'disabled'
    ],
    [
      'Your Listing Products',
      userInfo?.isSeller ? '/product-list' : 'disabled'
    ],
    ['Your Order List', userInfo?.isSeller ? '/order-list' : 'disabled'],
    [''],
    ['separator'],
    ['separator'],
    ['Administration'],
    ['User Management', userInfo?.isAdmin ? '/user-list' : 'disabled'],
    [
      'All Product Catalogues',
      userInfo?.isAdmin ? '/product-list' : 'disabled'
    ],
    [
      'All Order Lists, Database',
      userInfo?.isAdmin ? '/order-list' : 'disabled'
    ],
    [''],
    ['separator'],
    ['separator'],
    ['#contact developer', 'disabled'],
    [''],
    ['separator'],
    ['separator']
  ];
}
