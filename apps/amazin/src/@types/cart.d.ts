type CartType = {
  _id: string;
  createdAt: string;
  cartItems: ItemType[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  taxPrice: number;
  shippingAddress: AddressType;
  paymentMethod: PaymentMethodType;
  seller: SellerType;
  user: UserType;
};
