import { memo } from 'react';

import { SuspenseNull } from 'src/components/CustomSuspense';
import { useBtnControl } from './useBtnControl';
import DropdownButton, { DropdownButtonProps } from './DropdownButton';

function NavButton({ children, ...rest }: DropdownButtonProps) {
  const { onHover, handleClick, onBlur } = useBtnControl();

  return (
    <DropdownButton onMouseEnter={onHover} onClick={handleClick} onMouseLeave={onBlur} {...rest}>
      <SuspenseNull children={children} />
    </DropdownButton>
  );
}

export default memo(NavButton);
