import React from 'react';
import { SHADOW } from '../../../constants';
import { useShadow } from '../../../hooks/useShadow';

export function _OpenSidebarBtn() {
  const { setShadowOf } = useShadow();
  return (
    <div
      className="open-sidebar nav-main__item flex"
      onClick={() => setShadowOf(SHADOW.SIDEBAR)}
    >
      <div className="sprite__bars"></div>
      <b>All</b>
    </div>
  );
}

const OpenSidebarBtn = React.memo(_OpenSidebarBtn);
export default OpenSidebarBtn;
