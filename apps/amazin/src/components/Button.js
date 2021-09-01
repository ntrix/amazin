import { memo } from 'react';
import { Link } from 'react-router-dom';

function Button({
  wrapClass = '',
  to = '',
  label = '',
  primary = false,
  xs = false,
  fill = false,
  className = '',
  ariaLabel = label || wrapClass || className,
  children,
  ...props
}) {
  className = `${primary ? 'primary ' : ''}${xs ? 'btn--xs ' : ''}${fill ? 'col-fill ' : ''}mt-1 mb-1 ${className}`;

  const innerButton = (_props) => (
    <button className={className} aria-label={ariaLabel} {..._props} children={label || children} />
  );

  if (to) return <Link to={to} {...props} children={innerButton()} />;

  return !wrapClass ? innerButton(props) : <div className={wrapClass}>{innerButton(props)}</div>;
}

export default memo(Button);
