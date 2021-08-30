import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortName } from 'src/utils';
import { signout } from 'src/apis/userAPI';
import { signinTemplate } from './signinTemplate';
import { createUserTemplate } from './userTemplate';
import { createSellerTemplate } from './sellerTemplate';
import { adminTemplate } from './adminTemplate';

export function useDropMenuCreator() {
  const dispatch = useDispatch();
  const signoutHandler = useCallback(() => dispatch(signout()), [dispatch]);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [userName, setUserName] = useState('');
  const [userMenu, setUserMenu] = useState([]);
  const [sellerMenu, setSellerMenu] = useState([]);

  useEffect(() => {
    setUserName(!userInfo ? 'Sign in' : shortName(userInfo.name, 7));
    setUserMenu(!userInfo ? signinTemplate : createUserTemplate(userInfo, signoutHandler));
    setSellerMenu(createSellerTemplate(userInfo));
  }, [userInfo, signoutHandler]);
  return { userInfo, userName, userMenu, sellerMenu, adminMenu: adminTemplate };
}
