import { memo } from 'react';
import { Link } from 'react-router-dom';

const getClasses = (primary?: boolean, fill?: boolean, xs?: boolean) =>
  [primary ? 'primary ' : '', fill ? 'col-fill ' : '', xs ? 'btn--xs ' : ''].join('');

export type ButtonProps = {
  to?: string;
  label?: string;
  wrapClass?: string;
  primary?: boolean;
  fill?: boolean;
  xs?: boolean;
  className?: string;
  ariaLabel?: string;
  children?: Children;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: FnType;
  rest?: RestProps;
};

function Button({
  to = '',
  label = '',
  wrapClass = '',
  primary = false,
  fill = false,
  xs = false,
  className = '',
  ariaLabel = label || className,
  children,
  ...rest
}: ButtonProps) {
  const classNames = getClasses(primary, fill, xs) + 'mt-1 mb-2 ' + className;

  const child = (
    <button className={classNames} aria-label={ariaLabel} {...rest}>
      {label || children}
    </button>
  );

  if (to) return <Link to={to} children={child} />;
  if (!wrapClass) return child;
  return <div className={wrapClass} children={child} />;
}

export default memo(Button);
