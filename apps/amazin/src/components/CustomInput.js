import { memo } from 'react';

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
  const id = text.split(' ').join('-').toLowerCase(); // create #id for .css
  const onChange = setState ? (e) => setState(e.target.value) : undefined;
  const value = type === 'button' || type === 'submit' ? text : state || rest.value;
  const props = { id, text, type, placeholder, ...rest, value, onChange };

  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={id}>{label + ' '}</label>}
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
}

export default memo(CustomInput);
