import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from './menuItemsTemplate';
import { MenuItem } from './MenuItem';
import { signout } from '../../Controllers/userActions';

import { shortName } from '../../utils';
import LoadingOrError from '../../components/LoadingOrError';

export function _SidebarMenu({ currency, shadowFor, setShadowFor }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;

  return (
    <aside className={'sidebar' === shadowFor ? 'sidebar opened' : 'sidebar'}>
      <button onClick={() => setShadowFor('')} id="btn--close-sidebar">
        <div className="sprite__close-btn"></div>
      </button>

      <li onClick={() => setShadowFor('')}>
        <Link to="/profile" className="sidebar__header">
          <div className="sprite__user"></div>
          {'Hello, ' + shortName(userInfo)}
        </Link>
      </li>

      <ul className="sidebar__list">
        <LoadingOrError statusOf={productCategoryList} />

        {categories &&
          sidebarMenuItems(userInfo, currency, categories, () =>
            dispatch(signout())
          ).map(MenuItem(setShadowFor))}
      </ul>
    </aside>
  );
}

const SidebarMenu = React.memo(_SidebarMenu);
export default SidebarMenu;
