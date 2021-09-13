import { memo } from 'react';
import { castArray } from 'src/utils';

type PropType = {
  show?: boolean | undefined;
  msg?: string | boolean | undefined;
  variant?: string | undefined;
  wrapClass?: string | undefined;
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

export default memo(MessageBox);
