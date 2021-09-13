import { memo } from 'react';
import { createId } from 'src/utils';

type PropType = {
  text?: string | undefined;
  type?: string | undefined;
  placeholder?: string | undefined;
  hook?: StateType;
  onChange?: ChangeEvent | undefined;
  textarea?: boolean | undefined;
  label?: string | undefined;
  wrapClass?: string | undefined;
  required?: boolean | undefined;
  rest?: Props;
};

function CustomInput({
  text,
  type = 'text',
  placeholder = `Enter ${text}`,
  hook: [state, setState] = [],
  onChange,
  textarea = false,
  label = text,
  wrapClass = '',
  required,
  ...rest
}: PropType) {
  const id = createId(text); // create #id for .css
  const handler = setState ? (e: EventType) => setState(e.target.value) : onChange;
  const value = type === 'button' || type === 'submit' ? text : state;
  const props = { id, text, type, placeholder, value, onChange: handler, required, ...rest };

  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={id}>{label + ' '}</label>}
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
}

export default memo(CustomInput);
