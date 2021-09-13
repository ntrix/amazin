import { memo } from 'react';
import { Link } from 'react-router-dom';

type BooleanU = boolean | undefined;

const getClasses = (primary: BooleanU, fill: BooleanU, xs: BooleanU) =>
  [primary ? 'primary ' : '', fill ? 'col-fill ' : '', xs ? 'btn--xs ' : ''].join('');

type PropType = {
  to?: string;
  label?: string;
  wrapClass?: string;
  primary?: BooleanU;
  fill?: BooleanU;
  xs?: BooleanU;
  className?: string;
  ariaLabel?: string;
  children?: Children;
  type?: ButtonType;
  rest?: Props;
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
}: PropType) {
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
