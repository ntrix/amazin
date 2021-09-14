type AddressType = {
  fullName: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
};

type OrderType = ItemType;

type PaymentType = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};

type PayMethodType = 'Paypal' | 'Stripe';
