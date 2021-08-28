import { lazy, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../../apis/userAPI';
import { signinTemplate } from './signinTemplate';
import { createUserTemplate } from './userTemplate';
import { createSellerTemplate } from './sellerTemplate';
import { adminTemplate } from './adminTemplate';
import { shortName } from '../../../../utils';
const DropdownMenu = lazy(() => import(/* webpackPrefetch: true */ '../DropdownMenu'));

export default function useMenuCreator() {
  const dispatch = useDispatch();
  const signOutCb = useCallback(() => dispatch(signout()), [dispatch]);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [userName, setUserName] = useState('');
  const [userMenu, setUserMenu] = useState([]);
  const [sellerMenu, setSellerMenu] = useState([]);
  useEffect(() => {
    setUserName(!userInfo ? 'Sign in' : shortName(userInfo.name, 7));
    setUserMenu(!userInfo ? signinTemplate : createUserTemplate(userInfo, signOutCb));
    setSellerMenu(createSellerTemplate(userInfo));
  }, [userInfo]);
  return { userInfo, userName, userMenu, sellerMenu, adminMenu: adminTemplate };
}
