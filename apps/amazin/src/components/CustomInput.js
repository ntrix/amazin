import { memo } from 'react';
import { createId } from 'src/utils';

function CustomInput({
  text,
  type = 'text',
  placeholder = `Enter ${text}`,
  hook: [state, setState] = [],
  textarea = false,
  label = text,
  wrapClass = '',
  ...rest
}) {
  const id = createId(text); // create #id for .css
  const onChange = setState ? (e) => setState(e.target.value) : undefined;
  const value = type === 'button' || type === 'submit' ? text : state;
  const props = { id, text, type, placeholder, value, onChange, ...rest };

  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={id}>{label + ' '}</label>}
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
}

export default memo(CustomInput);
