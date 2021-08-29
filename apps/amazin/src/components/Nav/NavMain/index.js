import { memo } from 'react';
import { useSelector } from 'react-redux';
import LoadingOrError from '../../LoadingOrError';
import { NavCategoryAdapter } from '../MenuItem';
import { navMainTemplate } from './navMainTemplate';
import NavMainItem from './NavMainItem';
import OpenSidebarBtn from './OpenSidebarBtn';

function NavMain() {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  return (
    <div className="nav-main row">
      <div className="nav__left" children={<OpenSidebarBtn />} />
      <div className="nav__fill">
        {[...navMainTemplate, ...(productCategoryList?.categories?.slice(0, 9).map(NavCategoryAdapter) || [])].map(
          ([label, to], id) => (
            <NavMainItem label={label} to={to} key={id} />
          )
        )}
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
export default memo(NavMain);
