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
  /* create 2 examples as placeholder movies for videoScreen banner */
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
