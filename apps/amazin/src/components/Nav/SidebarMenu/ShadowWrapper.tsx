import { memo } from 'react';

import { useShadow } from 'src/hooks/useShadow';
import { SHADOW } from 'src/constants';

function ShadowWrapper({ header, children }: { header?: JSX.Element; children?: Children }) {
  const { shadowOf, setShadowOf } = useShadow();
  const id = 'btn--close-sidebar';
  const isOpened = SHADOW.SIDEBAR === shadowOf;

  return (
    <>
      <aside className={`sidebar ${isOpened ? 'opened' : ''}`}>
        <button id={id} onClick={() => setShadowOf && setShadowOf('')} aria-label="Close Sidebar">
          <div className="sprite__close-btn"></div>
        </button>

        {header}

        <ul className="sidebar__list">{children}</ul>
      </aside>

      <label htmlFor={id} className={isOpened ? 'click-catcher' : ''} aria-label="close sidebar area" />
    </>
  );
}

export default memo(ShadowWrapper);
