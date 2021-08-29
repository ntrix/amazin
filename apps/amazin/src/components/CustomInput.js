import { memo } from 'react';
function CustomInput({
  text,
  type = 'text',
  placeholder = `Enter ${text}`,
  hook,
  textarea = false,
  label = text,
  wrapClass = '',
  ...rest
}) {
  const id = text.split(' ').join('-').toLowerCase();
  const props = Object.assign(rest, { id, text, type, placeholder });
  if (hook) {
    props.value = hook[0];
    props.onChange = (e) => hook[1](e.target.value);
  }
  const value = type === 'button' || type === 'submit' ? text : rest.value;
  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={props.id}>{label + ' '}</label>}
      {textarea ? <textarea {...props} /> : <input value={value} {...props} />}
    </div>
  );
}
export default memo(CustomInput);
