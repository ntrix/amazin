import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from 'src/apis/userAPI';
import {
  sidebarBase,
  sidebarCurrencyCreator,
  sidebarUserCreator,
  sidebarSellerCreator,
  sidebarAdminCreator
} from './sidebarTemplate';
import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';
import { shortName } from 'src/utils';
import MenuItem, { NavCategoryAdapter, mapArgsToProps } from '../MenuItem';
import SidebarHeader from './SidebarHeader';
import LoadingOrError from 'src/components/LoadingOrError';

function SidebarMenu() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.productCategoryList);
  const { currency, userInfo, shadowOf, setShadowOf } = useShadow();

  const signOutHandler = useCallback(() => dispatch(signout()), [dispatch]);

  const userName = useCallback((_s) => shortName(_s), []);

  return (
    <>
      <aside className={`sidebar ${SHADOW.SIDEBAR === shadowOf ? 'opened' : ''}`}>
        <button id="btn--close-sidebar" onClick={() => setShadowOf('')} aria-label="Close Sidebar">
          <div className="sprite__close-btn"></div>
        </button>

        <SidebarHeader userName={userName(userInfo?.name)} clearShadow={setShadowOf} />

        <ul className="sidebar__list">
          <LoadingOrError statusOf={(loading, error)} />
          {[
            ...sidebarBase,
            ...(categories?.map(NavCategoryAdapter) || []),
            ...sidebarCurrencyCreator(currency),
            ...sidebarUserCreator(userInfo?.name, signOutHandler),
            ...sidebarSellerCreator(userInfo?.isSeller),
            ...sidebarAdminCreator(userInfo?.isAdmin)
          ]
            .map(mapArgsToProps)
            .map((props) => (
              <MenuItem {...props} clearShadow={setShadowOf} />
            ))}
        </ul>
      </aside>

      <label
        className={SHADOW.SIDEBAR === shadowOf ? 'click-catcher' : ''}
        htmlFor="btn--close-sidebar"
        aria-label="close sidebar area"
      />
    </>
  );
}

export default memo(SidebarMenu);
