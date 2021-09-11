interface Product {
  _id: string;
  name: string;
  qty: number;
  price: number;
  countInStock: number;
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
