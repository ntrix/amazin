type AddressType = {
  fullName: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
};

type OrderItem = ItemType & {
  isDelivered: boolean;
  deliveredAt: string;
};

type PaymentType = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
  isPaid: boolean;
  paidAt: string;
};

type PayMethodType = 'Paypal' | 'Stripe';

type OrderType = {
  _id: string;
  shippingAddress?: AddressType;
  paymentMethod?: PayMethodType;
  paymentResult?: PaymentType;
  user: UserType;
  seller?: SellerType;
  itemsPrice?: number;
  shippingPrice?: number;
  taxPrice?: number;
  createdAt: string;
  totalPrice: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
};

type OrderListType = {
  orders: OrderType[];
  loading?: boolean;
  error?: string;
  success?: boolean;
};
