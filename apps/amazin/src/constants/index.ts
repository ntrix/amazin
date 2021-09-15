export * from './carousel';
export * from './swiper';
export * from './videoScreen';
export * from './productReview';
export * from './sortFilter';
export * from './searchFilter';
export * from './storageRedux';
export * from './shadow';
export * from './nav';
export * from './mockDummy';

export const RATES_SOURCE = process.env.REACT_APP_RATES_SOURCE; // REACT_APP_RATES_SOURCE_ORG

/* cart, NavCart */
export const MAX_CART_QTY = 9999; // noway :)

export const MAX_2DIGITS = 99;

/* contact screen, mail server */
export const MAIL_SERVER = process.env.REACT_APP_CONTACT_MAIL_SERVER ?? '';

export const HEADERS = { mode: 'cors', headers: { 'Content-Type': 'application/json' } };

/* max products pro order */
export const MAX_ITEM = 100;

export const SHOW_ERROR_TIMEOUT = 15000;

/* Search box */
export const SEARCH = { MAX_SUGGESTS: 12 };

/* Date format */
export const DD_MM_YYYY = 10;

/* Currency format */
export const CURR_FORMAT = 2;

/* Tax rate, Germany default 2019 */
export const TAX = 0.19;
