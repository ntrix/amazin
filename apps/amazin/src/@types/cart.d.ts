interface ItemType {
  product: Product;
  name: string;
  price: number;
  qty: number;
  countInStock: number;
}

type CartType = ItemType[] | [];
