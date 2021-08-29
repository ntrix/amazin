import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';

export default function useSubmit() {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setSuggestBox } = useOutline();

  const submitHandler = useCallback(
    (e, input, activeCat) => {
      e?.preventDefault();
      if (!input) return;
      setSuggestBox(false);
      setShadowOf('');
      history.push(`/search/category/${activeCat}/name/${input}`);
    },
    [setSuggestBox, setShadowOf, history]
  );

  return [submitHandler];
}
