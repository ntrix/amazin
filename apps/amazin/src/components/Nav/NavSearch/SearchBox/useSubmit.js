import { useHistory } from 'react-router-dom';
import { useShadow } from 'src/hooks/useShadow';
import { useOutline } from '../useOutline';

export default function useSubmit() {
  const history = useHistory();
  const { setShadowOf } = useShadow();
  const { setSuggestBox } = useOutline();

  const submitHandler = (e, input, activeCat) => {
    e?.preventDefault();
    if (!input) return;
    setSuggestBox(false);
    setShadowOf('');
    history.push(`/search/category/${activeCat}/name/${input}`);
  };

  return [submitHandler];
}
