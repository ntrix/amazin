/* Location HTW */
export const LOCATION = {
  lat: 51.03751,
  lng: 13.73514
};

export const NO_IMAGE = '/images/no-image.png';

export const NO_IMAGE_P = '/images/no-image-p.png';

export const MAX_IMAGES = 8;

/* create dummy user, seller & 5 placeholders for seller info */
export const DUMMY_USER: UserType = {
  _id: '#',
  name: 'Anonym User',
  email: 'a@d.c'
};

export const DUMMY_SELLER: UserType = {
  ...DUMMY_USER,
  isSeller: true,
  seller: { name: 'Seller?', logo: NO_IMAGE } as SellerType
};

export const DUMMY_SELLERS: UserType[] = Array(5)
  .fill(0)
  .map((_, id) => ({ ...DUMMY_SELLER, _id: String(id) }));

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
