import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signout } from '../../../Controllers/userActions';

import {
  sidebarMenuTemplate,
  sidebarItemAdapter,
  sidebarMenuCreator
} from './sidebarTemplate';
import MenuItem, { mapMenuItemProp } from '../components/MenuItem';
import LoadingOrError from '../../../components/LoadingOrError';
import { shortName } from '../../../utils';
import { useShadow } from '../../../utils/useShadow';
import { SHADOW } from '../../../constants';

export function _SidebarMenu({ currency }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;
  const { shadowOf, setShadowOf } = useShadow();

  return (
    <>
      <aside
        className={`sidebar ${SHADOW.SIDEBAR === shadowOf ? 'opened' : ''}`}
      >
        <button
          id="btn--close-sidebar"
          onClick={() => setShadowOf('')}
          aria-label="Close Sidebar"
        >
          <div className="sprite__close-btn"></div>
        </button>
        <ul>
          <li onClick={() => setShadowOf('')}>
            <Link to="/profile" className="sidebar__header">
              <div className="sprite__user"></div>
              {'Hello, ' + shortName(userInfo)}
            </Link>
          </li>
        </ul>

        <ul className="sidebar__list">
          <LoadingOrError statusOf={productCategoryList} />

          {[
            ...sidebarMenuTemplate,
            ...(categories?.map(sidebarItemAdapter) || []),
            ...sidebarMenuCreator(currency, userInfo, () => dispatch(signout()))
          ]
            .map(mapMenuItemProp)
            .map((props) => (
              <MenuItem {...props} />
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

const SidebarMenu = React.memo(_SidebarMenu);
export default SidebarMenu;
