import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingOrError from '../../components/LoadingOrError';
import { SHADOW } from '../../constants';
import { useShadow } from '../../utils/useGlobal';

export function _HeaderNavMain() {
  const { setShadowOf, clearShadow } = useShadow('');
  const productCategoryList = useSelector((state) => state.productCategoryList);

  const navMainItem = ([label, linkTo, className]) => {
    return (
      <div key={label} className={className}>
        <Link to={linkTo} onClick={clearShadow}>
          {label}
        </Link>
      </div>
    );
  };

  return (
    <div className="nav-main row">
      <div className="nav__left">
        <div
          className="open-sidebar nav-main__item flex"
          onClick={() => setShadowOf(SHADOW.SIDEBAR)}
        >
          <div className="sprite__bars"></div>
          <b>All</b>
        </div>
      </div>

      <div className="nav__fill">
        {[
          ['Netflux Video', '/video'],
          ['Top Deals', '/deal'],
          ['New Releases', '/search/category/All/order/newest'],
          ['Customer Service', '/customer'],
          ['Best Sellers', '/banner/bestseller']
        ].map(([label, linkTo]) =>
          navMainItem([label, linkTo, 'nav-main__item'])
        )}

        <LoadingOrError statusOf={productCategoryList} />
        {productCategoryList.categories
          ?.slice(0, 15)
          .map((c) =>
            navMainItem([c, '/search/category/' + c, 'nav-main__item'])
          )}
      </div>

      <div className="nav__right">
        <div className="nav-main__item">
          <Link to="/contact/subject/Ads">
            <sup>Your Ads</sup> here on this place? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

const HeaderNavMain = React.memo(_HeaderNavMain);
export default HeaderNavMain;
