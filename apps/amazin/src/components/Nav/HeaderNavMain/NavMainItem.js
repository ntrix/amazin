import React from 'react';
import { Link } from 'react-router-dom';

export const _NavMainItem = ({ label, to, children, clearShadow }) => {
  return (
    <div className="nav-main__item">
      <Link to={to} onClick={() => clearShadow('')}>
        {children || label}
      </Link>
    </div>
  );
};

const NavMainItem = React.memo(_NavMainItem);
export default NavMainItem;
