import { memo } from 'react';
import { Link } from 'react-router-dom';

type PropType = {
  to?: string | undefined;
  label?: string | undefined;
  wrapClass?: string | undefined;
  primary?: boolean | undefined;
  fill?: boolean | undefined;
  xs?: boolean | undefined;
  className?: string | undefined;
  ariaLabel?: string | undefined;
  children?: Children;
  props?: Props;
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
  ...props
}: PropType) {
  const classNames = [
    primary ? 'primary ' : '',
    fill ? 'col-fill ' : '',
    xs ? 'btn--xs ' : '',
    'mt-1 mb-2 ',
    className
  ].join('');

  const child = (
    <button className={classNames} aria-label={ariaLabel} {...props}>
      {label || children}
    </button>
  );

  if (to) return <Link to={to} children={child} />;
  if (!wrapClass) return child;
  return <div className={wrapClass} children={child} />;
}

export default memo(Button);
