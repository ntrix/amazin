import { lazy, memo } from 'react';
import NavBtnControl from '../NavBtnControl';
import useMenuCreator from './useMenuCreator';
const DropdownUser = lazy(() => import(/* webpackPrefetch: true */ './DropdownUser'));

function NavUser(props) {
  const { userInfo, userName, userMenu, sellerMenu, adminMenu } = useMenuCreator();
  return (
    <>
      <NavBtnControl labels={`Hello, ${userName}^Account^ & Lists`}>
        <DropdownUser {...props} ddMenuList={userMenu} />
      </NavBtnControl>
      {userInfo?.isSeller && (
        <NavBtnControl wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownUser {...props} ddMenuList={sellerMenu} />
        </NavBtnControl>
      )}
      {userInfo?.isAdmin && (
        <NavBtnControl wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownUser {...props} ddMenuList={adminMenu} />
        </NavBtnControl>
      )}
    </>
  );
}
export default memo(NavUser);
