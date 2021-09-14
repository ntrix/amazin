type ReviewType = {
  name: string;
  comment: string;
  rating: number;
  createdAt: string;
};

type ProductType = {
  _id: string;
  name: string;
  seller: UserType;
  image: string;
  video?: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  price: number;
  deal: number;
  ship?: number;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  reviews?: ReviewType[];
};

type VideoType = {
  title?: string;
  original_title?: string;
  poster_path?: string;
  backdrop_path: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
};

type MovieType = VideoType & ProductType;

type ProductDetailType = StatusType & {
  product: ProductType;
};

type ProductListType = {
  products: ProductType[];
  page: number;
  count: number;
  category: string;
  pages: number;
  loading?: boolean;
  error?: string;
  success?: boolean;
};

/* only product name for search and suggest function */
type PNameType = { name: string };

type Category = string;

type ProductCategoriesType = StatusType & {
  categories: Category[];
};

type FilterStringType = Record<'seller' | 'name' | 'category' | 'order', string>;
type FilterNumberType = Record<'pageSize' | 'pageNumber' | 'deal' | 'min' | 'max' | 'rating', string | number>;
type FilterOptType = Partial<FilterStringType & FilterNumberType>;

type ResGetProductApi = Res & {
  data: {
    products: ProductType[];
  };
};

type ResGetProduct = ActionRedux & {
  payload: ResGetProductApi;
};

type ResGetProductItemApi = Res & {
  data: {
    product: ProductType;
  };
};

type ResGetProductItem = ActionRedux & {
  payload: ResGetProductItemApi;
};
