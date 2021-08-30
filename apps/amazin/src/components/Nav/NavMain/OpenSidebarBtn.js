import { memo } from 'react';
import { SHADOW } from 'src/constants';
import { useShadow } from 'src/hooks/useShadow';

function OpenSidebarBtn() {
  const { setShadowOf } = useShadow();
  return (
    <div className="open-sidebar nav-main__item flex" onClick={() => setShadowOf(SHADOW.SIDEBAR)}>
      <div className="sprite__bars"></div>
      <b>All</b>
    </div>
  );
}
export default memo(OpenSidebarBtn);
