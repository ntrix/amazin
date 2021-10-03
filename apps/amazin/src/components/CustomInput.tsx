import { forwardRef, memo, useState } from 'react';
import { validateRules } from 'src/constants';

import { createId, validate } from 'src/utils';
import { MessageLine } from './MessageBox';

type PropType = {
  text?: string;
  type?: string;
  rule?: string;
  placeholder?: string;
  hook?: HookType<string> | HookType<string[]> | HookType<number> | [];
  onChange?: ChangeEvent;
  onFocus?: FnType;
  onBlur?: FnType;
  textarea?: boolean;
  label?: string;
  wrapClass?: string;
  required?: boolean;
  rest?: RestProps;
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

function ValidateInput({ rule = '', hook = [], ...rest }: PropType) {
  const [value = ''] = hook as HookType<string>;

  const [validMsg, setValidMsg] = useState('\xa0');

  return (
    <>
      <Input
        wrapClass="xs m-0"
        hook={hook}
        {...rest}
        required
        onFocus={() => setValidMsg('\xa0')}
        onBlur={() => setValidMsg(validate(rule, value) || '✓')}
      />
      <MessageLine msg={validMsg} />
    </>
  );
}

function CustomInput(props: PropType) {
  const rule = props.type || props?.text?.toLowerCase() || '';
  const hasRules = Object.keys(validateRules).includes(rule);

  return hasRules ? <ValidateInput {...props} rule={rule} /> : <Input {...props} />;
}

export default memo(CustomInput);
