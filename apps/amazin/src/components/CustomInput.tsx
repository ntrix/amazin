import { forwardRef, memo, useState } from 'react';
import { validateRules } from 'src/constants';

import { createId, validate } from 'src/utils';
import { MessageLine } from './MessageBox';

type PropType = {
  text?: string;
  type?: string;
  placeholder?: string;
  hook?: HookType<string> | HookType<string[]> | HookType<number> | [];
  onChange?: ChangeEvent;
  onFocus?: FnType;
  onBlur?: FnType;
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

const Input = forwardRef<Ref<HTMLInputElement | HTMLTextAreaElement>, PropType>(
  (
    {
      text,
      type = 'text',
      placeholder = `Enter ${text}`,
      hook: [state = '', setState] = [],
      onChange,
      textarea = false,
      label = text,
      wrapClass = '',
      required,
      ...rest
    }: PropType,
    ref
  ) => {
    const id = createId(text); // create #id for .css
    const handler = setState ? (e: EventType) => setState(e.target.value) : onChange;
    const value = ['button', 'submit'].includes(type) ? text : state;
    const props = { id, text, type, placeholder, value, onChange: handler, required, ...rest };

    return (
      <div className={wrapClass}>
        {label !== 'none' && <label htmlFor={id}>{label + (required ? ' *' : ' ')}</label>}
        {textarea ? <textarea ref={ref} {...props} /> : <input ref={ref} {...props} />}
      </div>
    );
  }
);

function ValidateInput({ type, hook = [], ...rest }: PropType) {
  const [value = ''] = hook as HookType<string>;

  const [message, setMessage] = useState('\xa0');
  const props = { wrapClass: 'xs m-0', type, hook, required: true, ...rest };

  return (
    <>
      <Input {...props} onFocus={() => setMessage('\xa0')} onBlur={() => setMessage(validate(type, value) || '✓')} />
      <MessageLine msg={message} />
    </>
  );
}

function CustomInput(props: PropType) {
  const type = props.type || props?.text?.toLowerCase() || '';
  const hasRules = Object.keys(validateRules).includes(type);

  return hasRules ? <ValidateInput {...props} type={type} /> : <Input {...props} />;
}

export default memo(CustomInput);
