import { memo } from 'react';

import { useShadow } from 'src/hooks/useShadow';
import { SHADOW, SIDEBAR_CLOSE_BTN_ID } from 'src/constants';

function SidebarLayout({ header, children }: { header?: JSX.Element; children?: Children }) {
  const { shadowOf, setShadowOf } = useShadow();
  const isOpened = SHADOW.SIDEBAR === shadowOf;

  return (
    <aside className={`sidebar ${isOpened ? 'opened' : ''}`}>
      <button id={SIDEBAR_CLOSE_BTN_ID} onClick={() => setShadowOf('')} aria-label="Close Sidebar">
        <div className="sprite__close-btn" />
      </button>

      {header}

      <ul className="sidebar__list">{children}</ul>
    </aside>
  );
}

export default memo(SidebarLayout);
