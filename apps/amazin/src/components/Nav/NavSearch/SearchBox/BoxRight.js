import { memo } from 'react';
import SearchBtn from './SearchBtn';

function BoxRight({ submitHandler }) {
  return (
    <div className="row--right">
      <SearchBtn submitHandler={submitHandler} />
    </div>
  );
}

export default memo(BoxRight);
