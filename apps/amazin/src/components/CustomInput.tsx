import { memo } from 'react';
import { createId } from 'src/utils';

type PropType = {
  text?: string;
  type?: string;
  placeholder?: string;
  hook?: HookType<string> | HookType<string[]> | HookType<number> | [];
  onChange?: ChangeEvent;
  textarea?: boolean;
  label?: string;
  wrapClass?: string;
  required?: boolean;
  rest?: Props;
  name?: string;
  multiple?: boolean;
  onKeyUp?: KeyEvent;
  rows?: number;
  className?: string;
  value?: string;
  autoComplete?: string;
};

function CustomInput({
  text,
  type = 'text',
  placeholder = `Enter ${text}`,
  hook: [state, setState] = [],
  onChange = setState && ((e: EventType) => setState(e.target.value)),
  textarea = false,
  label = text,
  wrapClass = '',
  required,
  ...rest
}: PropType) {
  const id = createId(text); // create #id for .css
  const value = type === 'button' || type === 'submit' ? text : state ?? '';
  const props = { id, text, type, placeholder, value, onChange, required, ...rest };

  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={id}>{label + ' '}</label>}
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
}

export default memo(CustomInput);
