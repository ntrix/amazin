export default function CustomInput({
  text,
  type = 'text',
  placeholder = `Enter ${text}`,
  hook,
  textarea = false,
  noLabel = false,
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
      {!noLabel && <label htmlFor={props.id}>{text}</label>}
      {textarea ? <textarea {...props} /> : <input {...props} />}
    </div>
  );
}
