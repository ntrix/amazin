import React from 'react';
import { Link } from 'react-router-dom';
import { useShadow } from '../../../utils/useShadow';

export const _NavMainItem = ({ label, to, children }) => {
  const { setShadowOf } = useShadow();

  return (
    <div className="nav-main__item">
      <Link to={to} onClick={() => setShadowOf('')}>
        {children || label}
      </Link>
    </div>
  );
};

const NavMainItem = React.memo(_NavMainItem);
export default NavMainItem;
