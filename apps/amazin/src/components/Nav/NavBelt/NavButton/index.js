import { memo } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import { useBtnControl } from './useBtnControl';
import DropdownButton from './DropdownButton';

function NavButton({ children, ...props }) {
  const { onHover, handleClick, onBlur } = useBtnControl();

  return (
    <DropdownButton tabIndex="2" onMouseEnter={onHover} onClick={handleClick} onMouseLeave={onBlur} {...props}>
      <SuspenseNull children={children} />
    </DropdownButton>
  );
}

export default memo(NavButton);
