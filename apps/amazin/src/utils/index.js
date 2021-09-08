import { CURR_FORMAT, SRC_URL, NO_IMAGE, KEY, NO_IMAGE_P } from '../constants';
export { findSuggest } from './findSuggest';

export const castArray = (strArray) => (Array.isArray(strArray) ? strArray : [strArray]);

/* create #id for .css */
export const createId = (text) => text?.split(' ').join('-').toLowerCase();

/* Proxy for localStorage and Redux, mostly used for local storage */
export const Storage = new Proxy(KEY, {
  get(obj, key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  },
  set(obj, key, value) {
    if (value === '') localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
});

/* util for currency and all its pipes, rates, calculations, can use intl instead */
export const pipe = {
  currency: 'EUR',
  currencies: ['EUR', 'GBP', 'USD', 'PLN', 'CZK', 'CHF'],
  rates: {
    //default dummy rate
    EUR: 1,
    USD: 1.2,
    GBP: 0.9,
    CZK: 27,
    PLN: 5,
    CHF: 1.1
  },
  longName: {
    GBP: 'GB Pounds',
    USD: 'US Dollar',
    PLN: 'Polish Zloty',
    CZK: 'Czech Koruna',
    CHF: 'Swiss France',
    EUR: 'Euro (Default)'
  },
  symbol: {
    GBP: '£',
    USD: '$',
    PLN: 'zł',
    CZK: 'Kč',
    CHF: 'CHf',
    EUR: '€'
  },
  setCurrency(currency) {
    this.currency = currency;
  },
  updateRates(newRates) {
    if (newRates?.length) this.currencies.map((c) => (this.rates[c] = newRates[c]));
  },
  getSymbol(currency = this.currency) {
    return this.symbol[currency];
  },
  getName(currency) {
    return {
      GBP: 'GB Pounds',
      USD: 'US Dollar',
      PLN: 'Polish Zloty',
      CZK: 'Czech Koruna',
      CHF: 'Swiss France',
      EUR: 'Euro (Default)'
    }[currency || this.currency];
  },
  getRate(currency) {
    return this.rates[currency || this.currency] || 1;
  },
  getPrice(price = 0, rate = this.getRate()) {
    return (price * rate).toFixed(CURR_FORMAT);
  },
  getNote(price = 0, rate = this.getRate()) {
    return ((price * rate) | 0).toString();
  },
  getCent(price = 0, rate = this.getRate()) {
    return (price * rate).toFixed(CURR_FORMAT).slice(-CURR_FORMAT);
  },
  showPrice(price) {
    return `${this.getSymbol()} ${this.getPrice(price)}`;
  }
};

/* save current path to localStorage, no need to save path on the same screen */
export const savePath =
  (exceptionStartWith = '@') =>
  () => {
    if (!window.location.pathname.startsWith(exceptionStartWith)) Storage[KEY.HISTORY] = window.location.pathname;
  };

/* Adapter pattern (or create placeholders, default values if movie products are not exists) for video movies source from 3rd party API */
const getUrl = (url) => (url ? SRC_URL + url : '');
const getName = (m) => m.name || m.title || m.original_title || 'Product Name';
const getImage = (m) =>
  m.image ||
  `${getUrl(m.poster_path)}${m.backdrop_path ? '^' : ''}${getUrl(m.backdrop_path)}` ||
  `${NO_IMAGE_P}^${NO_IMAGE}`;

export const sourceAdapter = (movies, id) =>
  movies?.map((m) => ({
    _id: m._id || `#${id}`,
    name: getName(m),
    image: getImage(m),
    rating: m.rating || m.vote_average / 2 || 0,
    numReviews: m.numReviews || m.vote_count || 0,
    description: m.description || m.overview,
    video: m.video,
    seller: m.seller,
    price: 0,
    deal: 1,
    category: 'Product Category'
  }));

/* create an array of 6 dummyProducts (a2 rows) for product card & screen */
export const dummyProducts = sourceAdapter(Array(6).fill(1));

/* create an array of 12 dummyMovies (a row) for videoRow(s) */
export const dummyMovies = sourceAdapter(Array(12).fill(1));

/* add absolute links or origin to image url or return a default */
export const getImgUrl = (productId, imgName) => {
  if (!imgName) return NO_IMAGE;
  // extern absolute Image Link? or embedded Image Link?
  return imgName.startsWith('http') || imgName.startsWith('/')
    ? imgName
    : `${process.env.REACT_APP_IMG_BASE_URL}${productId}/${imgName}`;
};

export function shortName(userName, length) {
  if (!userName?.length) return 'Sign In';
  if (!length) return userName;
  const name = userName.split(' ')[0];
  return name.slice(0, length) + (name.length > length ? '..' : '');
}

export function debounce(func, duration = 500) {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => {
      id = null;
      return func.apply(this, args);
    }, duration);
  };
}

export function doThenDebounce(func, duration = 500, id = null) {
  return function (...args) {
    if (!id) {
      id = func.apply(this, args);
      return;
    }
    clearTimeout(id);
    id = setTimeout(() => {
      id = null;
      return func.apply(this, args);
    }, duration);
  };
}

export function throttle(func, duration) {
  let isWaiting = false;
  return function (...args) {
    if (isWaiting) return;
    func.apply(this, args);
    isWaiting = true;
    setTimeout(() => (isWaiting = false), duration);
  };
}
