import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useOutline } from '../useOutline';
import { useShadow } from 'src/hooks/useShadow';
import { NAV } from 'src/constants';
import BoxLeft from './BoxLeft';
import BoxMiddle from './BoxMiddle';
import SearchBtn from './SearchBtn';

export default function SearchBox(props) {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setSuggestBox } = useOutline();
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [input, setInput] = useState('');

  const submitHandler = (e) => {
    e?.preventDefault();
    if (!input) return;
    setSuggestBox(false);
    setShadowOf('');
    history.push(`/search/category/${activeCat}/name/${input}`);
  };

  return (
    <form {...props}>
      <BoxLeft activeCat={activeCat} setActiveCat={setActiveCat} />
      <BoxMiddle input={input} setInput={setInput} submitHandler={submitHandler} />
      <div className="row--right">
        <SearchBtn submitHandler={submitHandler} />
      </div>
    </form>
  );
}
