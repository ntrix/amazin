import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const RATES_SOURCE = process.env.REACT_APP_RATES_SOURCE; // REACT_APP_RATES_SOURCE_ORG

export const NO_IMAGE = '/images/no-image.png';
export const MAX_IMAGES = 8;

/* shadow background layer */
export const SHADOW = {
  SCOPE: 'scope',
  SEARCH_BOX: 'searchBox',
  NAV_DD: 'navDrop',
  SIDEBAR: 'sidebar'
};

/* local storage and Redux */
export const STORAGE = {
  USERINFO: 'userInfo',
  CART_ITEMS: 'cartItems',
  SHIPPING_ADDRESS: 'shippingAddress',
  CURRENCY: 'currency',
  HISTORY: 'backToHistory'
};

export const SHOW_ERROR_TIMEOUT = 9000;

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
export const NAV = { ALL_CATEGORIES: 'All Categories', ALL: 'All' };
export const getCatLabel = (cat) =>
  cat === NAV.ALL ? NAV.ALL_CATEGORIES : cat;

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

/* VideoScreen */
export const SRC_URL = 'https://image.tmdb.org/t/p/original/';
export const TRENDING = 'Trending Now';
export const TOP_RATED = 'Top Rated';

const _API = process.env.REACT_APP_API_KEY;
const _SOURCES = {
  'NETFLUX ORIGINALS': `/discover/tv?api_key=${_API}&with_networks=213`,
  'Action Movies': `/discover/movie?api_key=${_API}&with_genres=28`,
  'Comedy Movies': `/discover/movie?api_key=${_API}&with_genres=35`,
  'Horror Movies': `/discover/movie?api_key=${_API}&with_genres=27`,
  'Romance Movies': `/discover/movie?api_key=${_API}&with_genres=10749`,
  Documentaries: `/discover/movie?api_key=${_API}&with_genres=99`,
  [TRENDING]: `/trending/all/week?api_key=${_API}&language=en-US`,
  [TOP_RATED]: `/movie/top_rated?api_key=${_API}&language=en-US`
};
const _videoNavLabels = Object.keys(_SOURCES);
_videoNavLabels.splice(1, 0, 'Home', 'STORE');

export const VIDEO = {
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
      image: ` ^${SRC_URL}56v2KjBlU4XaOv9rVYEQypROD7P.jpg`,
      description:
        'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.'
    },
    {
      name: "The Queen's Gambit",
      image: ` ^${SRC_URL}34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg`,
      description:
        'In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.'
    }
  ]
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
