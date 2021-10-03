import { lazy, memo } from 'react';

import { useDropMenuCreator } from './useDropMenuCreator';
import NavButton from '../NavButton';
const DropdownUser: Lazy = lazy((): LazyPromise => import(/* webpackPrefetch: true */ './DropdownUser'));

function NavUser() {
  const { userInfo, userName, userMenu, sellerMenu, adminMenu } = useDropMenuCreator();

  return (
    <>
      <NavButton labels={`Hello, ${userName}^Account^ & Lists`}>
        <DropdownUser ddMenuList={userMenu} />
      </NavButton>

      {userInfo?.isSeller && (
        <NavButton wrapClass="nav__seller" labels="Seller^Desk">
          <DropdownUser ddMenuList={sellerMenu} />
        </NavButton>
      )}

      {userInfo?.isAdmin && (
        <NavButton wrapClass="nav__admin phone--off" labels="Admin^Tools">
          <DropdownUser ddMenuList={adminMenu} />
        </NavButton>
      )}
    </>
  );
}

export default memo(NavUser);
