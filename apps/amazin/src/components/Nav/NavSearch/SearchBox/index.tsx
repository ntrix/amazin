import { memo, useCallback, useState } from 'react';

import { NAV } from 'src/constants';
import { useOutline } from '../useOutline';
import { useSubmit } from './useSubmit';
import BoxLeft from './BoxLeft';
import BoxMiddle from './BoxMiddle';
import BoxRight from './BoxRight';

function SearchBox() {
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const { outline } = useOutline();
  const { handleSubmit } = useSubmit();

  const submitSearchCb = useCallback((e) => handleSubmit(e, input, activeCat), [handleSubmit, input, activeCat]);

  return (
    <form className={`search-box ${outline ? 'focus' : ''}`}>
      <BoxLeft activeCat={activeCat} setActiveCat={setActiveCat} />

      <BoxMiddle input={input} setInput={setInput} submitSearch={submitSearchCb} />

      <BoxRight submitSearch={submitSearchCb} />
    </form>
  );
}

export default memo(SearchBox);
