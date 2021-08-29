import { useCallback, useState } from 'react';
import { NAV } from 'src/constants';
import useSubmit from './useSubmit';
import BoxLeft from './BoxLeft';
import BoxMiddle from './BoxMiddle';
import BoxRight from './BoxRight';

export default function SearchBox(props) {
  const [input, setInput] = useState('');
  const [activeCat, setActiveCat] = useState(NAV.ALL);
  const [submitFn] = useSubmit();
  const submitHandler = useCallback((e) => submitFn(e, input, activeCat), [input, activeCat]);

  return (
    <form {...props}>
      <BoxLeft activeCat={activeCat} setActiveCat={setActiveCat} />
      <BoxMiddle input={input} setInput={setInput} submitHandler={submitHandler} />
      <BoxRight submitHandler={submitHandler} />
    </form>
  );
}
