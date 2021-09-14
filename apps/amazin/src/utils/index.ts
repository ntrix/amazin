import { CURR_FORMAT, SRC_URL, NO_IMAGE, KEY, NO_IMAGE_P } from '../constants';
export { findSuggest } from './findSuggest';

export const castArray = (strArray: unknown) => (Array.isArray(strArray) ? strArray : [strArray]);

/* create #id for .css */
export const createId = (text: string | undefined) => text?.split(' ').join('-').toLowerCase();

/* Proxy for localStorage and Redux, mostly used for local storage */
export const Storage = new Proxy(KEY, {
  get(obj, key) {
    try {
      return JSON.parse(localStorage.getItem(String(key)) ?? '');
    } catch (e) {
      return localStorage.getItem(String(key));
    }
  },
  set(obj, key, value) {
    if (value === '') localStorage.removeItem(String(key));
    else localStorage.setItem(String(key), JSON.stringify(value));
    return true;
  }
});

/* util for currency and all its pipes, rates, calculations, can use intl instead */
const rates = {
  //default dummy rate
  EUR: 1,
  USD: 1.2,
  GBP: 0.9,
  CZK: 27,
  PLN: 5,
  CHF: 1.1
};
const longName = {
  GBP: 'GB Pounds',
  USD: 'US Dollar',
  PLN: 'Polish Zloty',
  CZK: 'Czech Koruna',
  CHF: 'Swiss France',
  EUR: 'Euro (Default)'
};
const symbol = {
  GBP: '£',
  USD: '$',
  PLN: 'zł',
  CZK: 'Kč',
  CHF: 'CHf',
  EUR: '€'
};

type pipeType = {
  rates: typeof rates;
  longName: typeof longName;
  symbol: typeof symbol;
  currency: string;
  currencies: string[];
  setCurrency: FnType;
  updateRates: FnType;
  getSymbol: FnType;
  getName: FnType;
  getRate: FnType;
  getPrice: FnType;
  getNote: FnType;
  getCent: FnType;
  showPrice: FnType;
};
export const pipe: pipeType = {
  rates,
  longName,
  symbol,
  currency: 'EUR',
  currencies: ['EUR', 'GBP', 'USD', 'PLN', 'CZK', 'CHF'],
  setCurrency(currency) {
    this.currency = currency;
  },
  updateRates(newRates: number[]): void {
    if (newRates?.length) this.currencies.map((c) => (this.rates[c] = newRates[c]));
  },
  getSymbol(currency: string): string {
    return this.symbol[currency || this.currency];
  },
  getName(currency: string): number {
    return longName[currency || this.currency];
  },
  getRate(currency: string): number {
    return rates[currency || this.currency] || 1;
  },
  getPrice(price = 0, rate: number | undefined): string {
    return (price * (rate || this.getRate())).toFixed(CURR_FORMAT);
  },
  getNote(price = 0, rate) {
    return ((price * (rate || this.getRate())) | 0).toString();
  },
  getCent(price = 0, rate) {
    return (price * (rate || this.getRate())).toFixed(CURR_FORMAT).slice(-CURR_FORMAT);
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
const getUrl = (url: string | undefined) => (url ? SRC_URL + url : '');
const getName = (m: MovieType) => m.name || m.title || m.original_title || 'Product Name';
const getImage = (m: MovieType) =>
  m.image ||
  `${getUrl(m.poster_path)}${m.backdrop_path ? '^' : ''}${getUrl(m.backdrop_path)}` ||
  `${NO_IMAGE_P}^${NO_IMAGE}`;

export const sourceAdapter = (movies: MovieType[] | ProductType[], id?: number) =>
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
export const dummyMovies: MovieType[] = sourceAdapter(Array(12).fill(1));

/* add absolute links or origin to image url or return a default */
export const getImgUrl = (productId, imgName) => {
  if (!imgName) return NO_IMAGE;
  // extern absolute Image Link? or embedded Image Link?
  return imgName.startsWith('http') || imgName.startsWith('/')
    ? imgName
    : `${process.env.REACT_APP_IMG_BASE_URL}${productId}/${imgName}`;
};

export function shortName(userName: string | undefined, length?: number): string {
  if (!userName?.length) return 'Sign In';
  if (!length) return userName;
  const name = userName.split(' ')[0];
  return name.slice(0, length) + (name.length > length ? '..' : '');
}

export function debounce<T extends unknown[], U>(callback: (...args: T) => PromiseLike<U> | U, wait = 500) {
  let timer: NodeJS.Timeout;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export function throttle<T extends unknown[], U>(func: (...args: T) => void | U, wait = 500) {
  let isCalled = false;

  return (...args: T): void | U => {
    if (!isCalled) {
      func(...args);
      isCalled = true;
      setTimeout(function () {
        isCalled = false;
      }, wait);
    }
  };
}
