import { memo, useState } from 'react';

import { NAV } from 'src/constants';
import { useOutline } from './useOutline';
import { useSubmit } from './useSubmit';
import BoxLeft from './SearchBox/BoxLeft';
import BoxMiddle from './SearchBox/BoxMiddle';
import BoxRight from './SearchBox/BoxRight';

function NavSearch() {
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');
  const { outline } = useOutline();
  const { handleSubmit } = useSubmit();

  return (
    <div className="nav__search">
      <form
        className={`search-box ${outline ? 'focus' : ''}`}
        onSubmit={(e: EventType) => {
          e.preventDefault();
        }}
      >
        <BoxLeft activeCat={activeCat} setActiveCat={setActiveCat} />

        <BoxMiddle
          input={input}
          setInput={setInput}
          submitSearch={(e: EventType) => handleSubmit(e, input, activeCat)}
        />

        <BoxRight submitSearch={(e: EventType) => handleSubmit(e, input, activeCat)} />
      </form>
    </div>
  );
}

export default memo(NavSearch);
