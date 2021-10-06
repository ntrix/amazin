import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useOutline } from './useOutline';
import { useShadow } from 'src/hooks/useShadow';

export function useSubmit() {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setActiveSuggest, setSuggestBox } = useOutline();

  const handleSubmit = useCallback(
    (e: EventType, input: string, activeCat: string) => {
      e?.preventDefault();
      if (!input) return;

      setSuggestBox(false);
      setShadowOf('');
      history.push(`/search/category/${activeCat}/name/${input}`);
      return () => setActiveSuggest(-1);
    },
    [history, setShadowOf, setActiveSuggest, setSuggestBox]
  );

  return { handleSubmit };
}
