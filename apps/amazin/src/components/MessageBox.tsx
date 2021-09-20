import { memo } from 'react';

type PropType = {
  show?: boolean;
  msg?: string | string[] | boolean;
  variant?: MsgVariants;
  wrapClass?: string;
  xs?: boolean;
  children?: Children;
};

function MessageBox({ show = false, msg, variant = 'info', wrapClass = '', xs = false, children }: PropType) {
  if (!show && !msg) return null;
  const message = msg || children;

  const innerComponent = () => (
    <div className={`alert alert--${variant} ${xs ? 'xs' : ''}`}>
      {Array.isArray(message) ? message.map((row, id) => <li key={id}>{row}</li>) : message}
    </div>
  );

  return !wrapClass ? innerComponent() : <div className={wrapClass}>{innerComponent()}</div>;
}

export default memo(MessageBox);
