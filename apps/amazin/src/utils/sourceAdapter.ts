import { NO_IMAGE, NO_IMAGE_P, SRC_URL } from 'src/constants';

/* Adapter pattern (or create placeholders, create default values if movie products are not exists) for video movies source from 3rd party API */
const getUrl = (url: string | undefined) => (url ? SRC_URL + url : '');
const getName = (m: MovieType) => m.name || m.title || m.original_title || 'Product Name';
const getImage = (m: MovieType) =>
  m.image ||
  `${getUrl(m.poster_path)}${m.backdrop_path ? '^' : ''}${getUrl(m.backdrop_path)}` ||
  `${NO_IMAGE_P}^${NO_IMAGE}`;

export const sourceAdapter = (movies: MovieType[], id?: number): MovieType[] =>
  movies?.map((m) => ({
    _id: m._id || `#${id}`,
    name: getName(m),
    image: getImage(m),
    rating: m.rating || (m.vote_average || 0) / 2,
    numReviews: m.numReviews || m.vote_count || 0,
    description: m.description || m.overview,
    video: m.video,
    seller: m.seller,
    price: 0,
    deal: 1,
    category: 'Product Category'
  }));
