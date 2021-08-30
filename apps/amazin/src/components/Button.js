import { memo } from 'react';
import { Link } from 'react-router-dom';

function Button({
  wrapClass = '',
  to = '',
  label = '',
  primary = false,
  xs = false,
  className = '',
  ariaLabel = label || wrapClass || className,
  children,
  ...props
}) {
  className = `${primary ? 'primary' : ''} ${xs ? 'btn--xs' : ''} ${className} mb-1`;
  const innerButton = (_props) => (
    <button className={className} ariaLabel={ariaLabel} {..._props} children={label || children} />
  );
  if (to) return <Link to={to} {...props} children={innerButton()} />;
  return !wrapClass ? innerButton(props) : <div className={wrapClass}>{innerButton(props)}</div>;
}
export default memo(Button);
