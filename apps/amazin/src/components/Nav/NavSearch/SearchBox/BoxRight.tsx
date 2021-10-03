import { memo } from 'react';

import SearchBtn, { SearchBtnProps } from './SearchBtn';

function BoxRight(props: SearchBtnProps) {
  return (
    <div className="box__right">
      <SearchBtn {...props} />
    </div>
  );
}

export default memo(BoxRight);
