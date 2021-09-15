type AddressType = {
  fullName: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
};

type LocationType = {
  lat?: any;
  lng?: any;
  address?: any;
  name?: any;
  vicinity?: any;
  googleAddressId?: any;
  getPlaces?: FnType;
};

type MapType = any;
