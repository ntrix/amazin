import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signout } from '../../../apis/userAPI';
import {
  sidebarBase,
  sidebarCurrencyCreator,
  sidebarUserCreator,
  sidebarSellerCreator,
  sidebarAdminCreator
} from './sidebarTemplate';
import MenuItem, { NavCategoryAdapter, mapArgsToProps } from '../MenuItem';
import LoadingOrError from '../../LoadingOrError';
import { useShadow } from '../../../hooks/useShadow';
import { SHADOW } from '../../../constants';
import SidebarHeader from './SidebarHeader';
import { shortName } from 'src/utils';

function SidebarMenu({ currency }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;
  const { shadowOf, setShadowOf } = useShadow();
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
          <LoadingOrError statusOf={productCategoryList} />
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
      ></label>
    </>
  );
}
export default memo(SidebarMenu);
