import React, { lazy, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../../../apis/userAPI';
import NavBtnControl from '../NavBtnControl';
import { signinTemplate } from './signinTemplate';
import { createUserTemplate } from './userTemplate';
import { createSellerTemplate } from './sellerTemplate';
import { adminTemplate } from './adminTemplate';
import { shortName } from '../../../../utils';
const DropdownMenu = lazy(() => import(/* webpackPrefetch: true */ '../DropdownMenu'));

function NavUser(props) {
  const dispatch = useDispatch();
  const signOutCb = useCallback(() => dispatch(signout()), [dispatch]);
  const { userInfo } = useSelector((state) => state.userSignin);
  const userName = !userInfo ? 'Sign in' : shortName(userInfo.name, 7);
  const userTemplate = !userInfo ? signinTemplate : createUserTemplate(userInfo, signOutCb);
  const sellerTemplate = createSellerTemplate(userInfo);
  return (
    <>
      <NavBtnControl labels={`Hello, ${userName}^Account^ & Lists`}>
        <DropdownMenu {...props} ddMenuList={userTemplate} />
      </NavBtnControl>
      {userInfo?.isSeller && (
        <NavBtnControl wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownMenu {...props} ddMenuList={sellerTemplate} />
        </NavBtnControl>
      )}
      {userInfo?.isAdmin && (
        <NavBtnControl wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownMenu {...props} ddMenuList={adminTemplate} />
        </NavBtnControl>
      )}
    </>
  );
}
export default React.memo(NavUser);
