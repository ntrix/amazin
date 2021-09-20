import { forwardRef, memo, useRef, useState } from 'react';
import { validateRules } from 'src/constants';

import { createId } from 'src/utils';
import MessageBox from './MessageBox';

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
  const validateRule = validateRules[type as RuleName];
  const regEx = new RegExp(validateRule.RegEx, 'g');

  const input = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [isValid, setIsValid] = useState<boolean>();
  const props = { ref: input, wrapClass: 'xs m-0', type, hook, required: true, ...rest };

  return (
    <>
      <Input {...props} onFocus={() => setIsValid(undefined)} onBlur={() => setIsValid(regEx.test(value))} />
      {isValid === undefined ? (
        <div className="alert xs">{'\xa0'}</div>
      ) : (
        <MessageBox xs variant={isValid ? 'success' : 'danger'} show>
          {value ? (isValid ? '✓' : validateRule.msg) : rest.text + ' is required!'}
        </MessageBox>
      )}
    </>
  );
}

function CustomInput(props: PropType) {
  const rule = (props.type || props.text || '').toLowerCase();
  const hasRules = Object.keys(validateRules).includes(rule);

  return hasRules ? <ValidateInput {...props} type={rule} /> : <Input {...props} />;
}

export default memo(CustomInput);
