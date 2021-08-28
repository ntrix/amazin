import { lazy } from 'react';
import NavBtnControl from '../NavBtnControl';
import useMenuCreator from './useMenuCreator';
const DropdownMenu = lazy(() => import(/* webpackPrefetch: true */ '../DropdownMenu'));
export default function NavUser(props) {
  const { userInfo, userName, userMenu, sellerMenu, adminMenu } = useMenuCreator();
  return (
    <>
      <NavBtnControl labels={`Hello, ${userName}^Account^ & Lists`}>
        <DropdownMenu {...props} ddMenuList={userMenu} />
      </NavBtnControl>
      {userInfo?.isSeller && (
        <NavBtnControl wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownMenu {...props} ddMenuList={sellerMenu} />
        </NavBtnControl>
      )}
      {userInfo?.isAdmin && (
        <NavBtnControl wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownMenu {...props} ddMenuList={adminMenu} />
        </NavBtnControl>
      )}
    </>
  );
}
