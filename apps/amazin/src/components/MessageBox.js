import { memo } from 'react';
import { castArray } from 'src/utils';

function MessageBox({ show = false, msg, variant, wrapClass = '', children }) {
  if (!show && !msg?.length) return null;

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
