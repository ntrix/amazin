import { memo } from 'react';

import SearchBtn from './SearchBtn';

function BoxRight(props) {
  return (
    <div className="row--right">
      <SearchBtn {...props} />
    </div>
  );
}

export default memo(BoxRight);
