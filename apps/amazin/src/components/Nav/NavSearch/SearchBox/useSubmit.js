import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useOutline } from '../useOutline';
import { useShadow } from 'src/hooks/useShadow';

export function useSubmit() {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setSuggestBox } = useOutline();

  const handleSubmit = useCallback((e, input, activeCat) => {
    e?.preventDefault();
    if (!input) return;
    setSuggestBox(false);
    setShadowOf('');
    history.push(`/search/category/${activeCat}/name/${input}`); // eslint-disable-next-line
  }, []);

  return { handleSubmit };
}
