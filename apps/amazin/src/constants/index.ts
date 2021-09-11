import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const RATES_SOURCE = process.env.REACT_APP_RATES_SOURCE; // REACT_APP_RATES_SOURCE_ORG

/* cart, NavCart */
export const MAX_CART_QTY = 9999; // noway :)
export const MAX_2DIGITS = 99;

/* contact screen, mail server */
export const MAIL_SERVER = process.env.REACT_APP_CONTACT_MAIL_SERVER;
export const HEADERS = { mode: 'cors', headers: { 'Content-Type': 'application/json' } };

/* max products pro order */
export const MAX_ITEM = 100;

/* ProductScreen reviews */
export const REVIEWS_PER_PAGE = 9;
export const RATING_OPTS = [
  { value: '', children: 'Select...' },
  { value: '1', children: '1- Poor' },
  { value: '2', children: '2- Fair' },
  { value: '3', children: '3- Good' },
  { value: '4', children: '4- Very good' },
  { value: '5', children: '5- Exzellent' }
];

export const NO_IMAGE = '/images/no-image.png';
export const NO_IMAGE_P = '/images/no-image-p.png';
export const MAX_IMAGES = 8;

/* shadow background layer */
export const SHADOW = {
  SCOPE: 'scope',
  NAV_SEARCH: 'navSearch',
  NAV_DD: 'navDrop',
  SIDEBAR: 'sidebar'
};

/* localStorage and Redux */
export const KEY = {
  USER_INFO: 'userInfo',
  CART_ITEMS: 'cartItems',
  SHIPPING_ADDRESS: 'shippingAddress',
  CURRENCY: 'currency',
  HISTORY: 'history'
};

export const SHOW_ERROR_TIMEOUT = 15000;

/* Location HTW */
export const LOCATION = {
  lat: 51.03751,
  lng: 13.73514
};

/* Search box */
export const SEARCH = { MAX_SUGGESTS: 12 };

/* Sort filter */
export const SORT = {
  NEWEST: { OPT: 'newest', LABEL: 'Newest Arrivals' },
  BESTSELLING: { OPT: 'bestselling', LABEL: 'Best Selling' },
  LOWEST: { OPT: 'lowest', LABEL: 'Price: Low to High' },
  HIGHEST: { OPT: 'highest', LABEL: 'Price: High to Low' },
  TOPRATED: { OPT: 'toprated', LABEL: 'Avg. Rating' }
};

/* Date format */
export const DD_MM_YYYY = 10;

/* Currency format */
export const CURR_FORMAT = 2;

/* Tax rate, Germany default 2019 */
export const TAX = 0.19;

/* Nav Menu label */
export const NAV = {
  ALL_CATEGORIES: 'All Categories',
  ALL: 'All',
  DEAL: 'Deals'
};
export const CatLabel = { [NAV.ALL]: NAV.ALL_CATEGORIES };

/* price range filter width label name */
export const prices = [0.01, 20, 50, 100, 200, 500, 1000, 2000, 5000].map((max, i, arr) => ({
  max,
  min: arr[i - 1] || 0,
  name: `${+arr[i - 1] | 0} to ${max | 0} EUR`
}));
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
  },
  {
    name: 'Any & up',
    rating: 0
  }
];

/* create 5 placeholders for seller info */
export const DUMMY_SELLER: SellerType = { name: 'Anonymous Seller', logo: NO_IMAGE };
export const DUMMY_USER: UserType = {
  _id: '#',
  name: 'Anonymous User',
  seller: DUMMY_SELLER
};
export const DUMMYSELLERS = Array(5).fill(DUMMY_USER);

/* create 5 placeholders for product info */
// export const dummyProducts = Array(6).fill({
//   _id: '#',
//   image: NO_IMAGE,
//   name: 'Product Name',
//   price: 0,
//   deal: 1,
//   category: 'Product Category',
//   rating: 0,
//   numReviews: 0
// });

/* VideoScreen */
export const SRC_URL = 'https://image.tmdb.org/t/p/original/';
export const TRENDING = 'Trending Now';
export const TOP_RATED = 'Top Rated';
export const NETFLUX = 'NETFLUX ORIGINALS';
export const STORE = 'STORE';
export const HOME = 'Home';
export const IN_STOCK = 'IN STOCK: READY TO BUY';

const _API = process.env.REACT_APP_API_KEY;
const _SOURCES = {
  [NETFLUX]: `/discover/tv?api_key=${_API}&with_networks=213`,
  'Action Movies': `/discover/movie?api_key=${_API}&with_genres=28`,
  'Comedy Movies': `/discover/movie?api_key=${_API}&with_genres=35`,
  'Horror Movies': `/discover/movie?api_key=${_API}&with_genres=27`,
  'Romance Movies': `/discover/movie?api_key=${_API}&with_genres=10749`,
  Documentaries: `/discover/movie?api_key=${_API}&with_genres=99`,
  [TRENDING]: `/trending/all/week?api_key=${_API}&language=en-US`,
  [TOP_RATED]: `/movie/top_rated?api_key=${_API}&language=en-US`
};
const _videoNavLabels = Object.keys(_SOURCES);
_videoNavLabels.splice(1, 0, HOME, STORE);

export const VIDEO = {
  SELLER: process.env.REACT_APP_SELLER,
  GENRES: _videoNavLabels,
  SRC: _SOURCES,
  URL: 'https://api.themoviedb.org/3',
  BANNER: '/images/banner-fs.jpg.png',
  EMPTY: [
    {
      name: '',
      image: '',
      description: ''
    }
  ],
  /* create 2 examples as placeholder movies for videoScreen movie banner */
  EXAMPLES: [
    {
      name: 'Stranger Things',
      image: `${SRC_URL}x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg^${SRC_URL}56v2KjBlU4XaOv9rVYEQypROD7P.jpg`,
      description:
        'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
    },
    {
      name: "The Queen's Gambit",
      image: `${SRC_URL}zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg^${SRC_URL}34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg`,
      description:
        'In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.'
    }
  ]
};

/* swiper config */
export const SWIPER_CONFIG = {
  spaceBetween: 20,
  navigation: true,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  autoplay: {
    delay: 5000,
    disableOnInteraction: true
  },
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false
  },
  pagination: {
    clickable: true
  }
};
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

export default Carousel;
