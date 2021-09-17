import { lazy, memo } from 'react';

import { useDropMenuCreator } from './useDropMenuCreator';
import NavButton from '../NavButton';
const DropdownUser: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './DropdownUser'));

function NavUser(props: Props) {
  const { userInfo, userName, userMenu, sellerMenu, adminMenu } = useDropMenuCreator();

  return (
    <>
      <NavButton labels={`Hello, ${userName}^Account^ & Lists`}>
        <DropdownUser {...props} ddMenuList={userMenu} />
      </NavButton>

      {userInfo?.isSeller && (
        <NavButton wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownUser {...props} ddMenuList={sellerMenu} />
        </NavButton>
      )}

      {userInfo?.isAdmin && (
        <NavButton wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownUser {...props} ddMenuList={adminMenu} />
        </NavButton>
      )}
    </>
  );
}

export default memo(NavUser);
