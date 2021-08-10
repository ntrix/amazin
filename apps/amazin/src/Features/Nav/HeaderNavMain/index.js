import React from 'react';
import { useSelector } from 'react-redux';

import LoadingOrError from '../../../components/LoadingOrError';
import NavMainItem from './NavMainItem';
import { navMainTemplate } from './navMainTemplate';
import OpenSidebarBtn from './OpenSidebarBtn';

export function _HeaderNavMain() {
  const productCategoryList = useSelector((state) => state.productCategoryList);

  return (
    <div className="nav-main row">
      <div className="nav__left">
        <OpenSidebarBtn />
      </div>

      <div className="nav__fill">
        {[
          ...navMainTemplate,
          ...(productCategoryList?.categories
            ?.slice(0, 15)
            .map((c) => [c, '/search/category/' + c]) || [])
        ].map(([label, to], id) => (
          <NavMainItem label={label} to={to} key={id} />
        ))}

        <LoadingOrError statusOf={productCategoryList} />
      </div>

      <div className="nav__right">
        <NavMainItem to="/contact/subject/Ads">
          <sup>Your Ads</sup> here on this place? Contact us
        </NavMainItem>
      </div>
    </div>
  );
}

const HeaderNavMain = React.memo(_HeaderNavMain);
export default HeaderNavMain;
