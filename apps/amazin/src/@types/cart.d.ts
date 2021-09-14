type CartType = {
  cartItems: ItemType[];
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  taxPrice: number;
  shippingAddress: AddressType;
  paymentMethod: PaymentMethodType;
  seller: SellerType;
  user: UserType;
  createdAt: string;
  _id: string;
};
