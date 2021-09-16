import { memo } from 'react';

import SearchBtn from './SearchBtn';

function BoxRight(props: Props) {
  return (
    <div className="box__right">
      <SearchBtn {...props} />
    </div>
  );
}

export default memo(BoxRight);
