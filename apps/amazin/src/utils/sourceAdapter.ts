import { VideoType, NO_IMAGE, NO_IMAGE_P, SRC_URL } from 'src/constants';

/* Adapter pattern (or create placeholders, create default values if movie products are not exists) for video movies source from 3rd party API */
const getUrl = (url: string | undefined) => (url ? SRC_URL + url : '');

const getName = (m: VideoType & ProductType) => m.name || m.title || m.original_title || 'Product Name';

const getImage = (m: VideoType & ProductType) =>
  m.image ||
  `${getUrl(m.poster_path)}${m.backdrop_path ? '^' : ''}${getUrl(m.backdrop_path)}` ||
  `${NO_IMAGE_P}^${NO_IMAGE}`;

export const sourceAdapter = (movies: (VideoType & ProductType)[], id?: number): (VideoType & ProductType)[] =>
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
