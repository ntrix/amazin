type ReqLogin = {
  email: string;
  password: string;
  oldPassword?: string;
  confirmPassword?: string;
};

type ResLoginApi = Res & {
  data: {
    access_token: string;
  };
};

type ResLogin = ActionRedux | {};

type SellerType = {
  name: string;
  logo: string;
  description?: string;
  rating?: number;
  numReviews?: number;
};

type UserType = {
  _id: string;
  name: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  isSeller?: boolean;
  failLoginCount?: number;
  currency?: CurrType;
  seller?: SellerType;
  verify?: boolean;
};

type UserInfoType = Partial<UserType> & {
  token: string;
};

type UserDetailType = StatusType & {
  user: UserType;
};

type UserListType = StatusType & {
  users: UserType[];
};

type ContactType = {
  name?: string;
  email?: string;
  subject?: string;
  text?: string;
};
