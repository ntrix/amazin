import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { shortName } from 'src/utils';
import { signout } from 'src/apis/userAPI';
import { signinTemplate } from './signinTemplate';
import { createUserTemplate } from './userTemplate';
import { createSellerTemplate } from './sellerTemplate';
import { adminTemplate } from './adminTemplate';
import { useShadow } from 'src/hooks/useShadow';

export function useDropMenuCreator() {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();

  const [userName, setUserName] = useState('');
  const [userMenu, setUserMenu] = useState<MenuType>([]);
  const [sellerMenu, setSellerMenu] = useState<MenuType>([]);

  const signoutHandler = useCallback(() => dispatch(signout()), [dispatch]);

  useEffect(() => {
    setUserName(!userInfo ? 'Sign in' : shortName(userInfo.name, 7));
    setUserMenu(!userInfo ? signinTemplate : createUserTemplate(userInfo, signoutHandler));
    setSellerMenu(createSellerTemplate(userInfo));
  }, [userInfo, signoutHandler]);

  return { userInfo, userName, userMenu, sellerMenu, adminMenu: adminTemplate };
}
