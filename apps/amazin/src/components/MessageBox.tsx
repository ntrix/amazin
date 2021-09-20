import { memo } from 'react';
import { castArray } from 'src/utils';

type PropType = {
  show?: boolean;
  msg?: string | string[] | boolean;
  variant?: string;
  wrapClass?: string;
  children?: Children;
};

function MessageBox({ show = false, msg, variant, wrapClass = '', children }: PropType) {
  if (!show && !msg) return null;

  const innerComponent = () => (
    <div className={`alert alert--${variant || 'info'}`}>
      {castArray(msg || children).map((row, id) => (
        <li key={id}>{row}</li>
      ))}
    </div>
  );

  return !wrapClass ? innerComponent() : <div className={wrapClass}>{innerComponent()}</div>;
}

export function MessageLine({ msg, variant = 0 }: { msg: string[]; variant: number }) {
  return <div className={`alert xs alert--${['', 'success'][variant] ?? 'danger'}`}>{msg[variant]}</div>;
}

export default memo(MessageBox);
