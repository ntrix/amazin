import { memo } from 'react';
import { castArray } from 'src/utils';

export type MessageBoxProps = {
  show?: boolean;
  msg?: string | string[] | boolean;
  variant?: string;
  wrapClass?: string;
  children?: Children;
};

function MessageBox({ show = false, msg, variant, wrapClass = '', children }: MessageBoxProps) {
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

export function MessageLine({ msg }: { msg: string }) {
  return (
    <div className={`alert xs alert--${{ '✓': ' success bold text-right', '\xa0': '' }[msg] ?? 'danger'}`}>{msg}</div>
  );
}

export default memo(MessageBox);
