import React from 'react';

export function _CustomInput({
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

  return (
    <div className={wrapClass}>
      {label !== 'none' && <label htmlFor={props.id}>{label + ' '}</label>}
      {textarea ? (
        <textarea {...props} />
      ) : (
        <input
          value={type === 'button' || type === 'submit' ? text : rest.value}
          {...props}
        />
      )}
    </div>
  );
}

const CustomInput = React.memo(_CustomInput);
export default CustomInput;
