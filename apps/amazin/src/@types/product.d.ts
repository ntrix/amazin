interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ResGetProductApi extends Res {
  data: {
    products: Product[];
  };
}

interface ResGetProduct extends ActionRedux {
  payload: ResGetProductApi;
}

interface ResGetProductItemApi extends Res {
  data: {
    product: Product;
  };
}

interface ResGetProductItem extends ActionRedux {
  payload: ResGetProductItemApi;
}

interface MovieType {
  _id?: string;
  name?: ReturnType;
  image?: ReturnType;
  vote_average?: number;
  rating?: number;
  vote_count?: number;
  numReviews?: number;
  overview?: string;
  description?: string;
  video?: string;
  seller?: any;
  price?: number;
  deal?: number;
  category?: string;
  title?: string;
  original_title?: string;
  poster_path?: string;
  backdrop_path: string;
}
