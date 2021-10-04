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
type ProductCategoriesType = StatusType & {
  categories: string[];
};
