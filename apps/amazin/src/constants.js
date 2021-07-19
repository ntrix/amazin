import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const RATES_SOURCE = process.env.REACT_APP_RATES_SOURCE; // REACT_APP_RATES_SOURCE_ORG

export const NO_IMAGE = '/images/no-image.png';
export const MAX_IMAGES = 8;

/* shadow background layer */
export const SHADOW = {
  SCOPE: 'scope',
  NAV_DD: 'navDrop',
  SIDEBAR: 'sidebar'
};

/* local storage and Redux */
export const STORAGE = {
  USERINFO: 'userInfo',
  CART_ITEMS: 'cartItems',
  SHIPPING_ADDRESS: 'shippingAddress'
};

export const SHOW_ERROR_TIMEOUT = 9000;

/* Location HTW */
export const START_LOCAL_LAT = 51.03751;
export const START_LOCAL_LNG = 13.73514;

/* Search box */
export const MAX_SEARCH_SUGGESTS = 12;

/* Date format */
export const DD_MM_YYYY = 10;

/* Currency format */
export const CURRENCY = 2;

/* Tax rate, Germany default 2019 */
export const TAX = 0.19;

/* Nav Menu label */
export const ALL_CATEGORIES = 'All Categories';

/* price range filter width label name */
export const prices = [0.01, 20, 50, 100, 200, 500, 1000, 2000, 5000].map(
  (max, i, arr) => ({
    max,
    min: arr[i - 1] || 0,
    name: `${+arr[i - 1] | 0} to ${max | 0} EUR`
  })
);
prices[0] = { min: 0, max: 0, name: 'Any' };

/* rating stars filter */
export const ratings = [
  {
    name: '4stars & up',
    rating: 4
  },

  {
    name: '3stars & up',
    rating: 3
  },

  {
    name: '2stars & up',
    rating: 2
  },

  {
    name: '1stars & up',
    rating: 1
  }
];

/* create 5 placeholders for seller info */
export const dummySellers = Array(5).fill({
  _id: '#',
  seller: { logo: NO_IMAGE, name: 'Anonymous Seller' }
});

/* create 5 placeholders for product info */
export const dummyProducts = Array(6).fill({
  _id: '#',
  image: NO_IMAGE,
  name: 'Product Name',
  price: 0,
  deal: 1,
  category: 'Product Category',
  rating: 0,
  numReviews: 0
});

export const NO_MOVIES = [
  {
    name: '',
    image: '',
    description: ''
  }
];

/* create 2 example Movies as placeholders for videoScreen movie banner */
export const EXAMPLE_MOVIES = [
  {
    name: 'Stranger Things',
    image:
      ' ^https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
    description:
      'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
  },
  {
    name: "The Queen's Gambit",
    image:
      ' ^https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg',
    description:
      'In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.'
  }
];

export const baseURL = 'https://image.tmdb.org/t/p/original/';

export default Carousel;

/* responsive resolutions for multi-carousel */
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
    slidesToSlide: 4
  },
  largeDesktop: {
    breakpoint: { max: 1500, min: 1080 },
    items: 4,
    slidesToSlide: 3
  },
  desktop: {
    breakpoint: { max: 1080, min: 720 },
    items: 3,
    slidesToSlide: 2
  },
  tablet: {
    breakpoint: { max: 720, min: 480 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};
