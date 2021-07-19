import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sidebarMenuItems } from './menuItemsTemplate';
import { MenuItem } from './MenuItem';
import { signout } from '../../Controllers/userActions';

import { shortName } from '../../utils';
import LoadingOrError from '../../components/LoadingOrError';
import { useShadow } from '../../utils/useShadow';
import { SHADOW } from '../../constants';

export function _SidebarMenu({ currency }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories } = productCategoryList;
  const [shadowOf, setShadowOf] = useShadow();

  return (
    <aside className={`sidebar ${SHADOW.SIDEBAR === shadowOf ? 'opened' : ''}`}>
      <button onClick={() => setShadowOf('')} id="btn--close-sidebar">
        <div className="sprite__close-btn"></div>
      </button>

      <li onClick={() => setShadowOf('')}>
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
          ).map(MenuItem)}
      </ul>
    </aside>
  );
}

const SidebarMenu = React.memo(_SidebarMenu);
export default SidebarMenu;
