import { Link } from 'react-router-dom';

const Button = ({
  wrapClass = '',
  to = '',
  label = '',
  primary = false,
  xs = false,
  className = '',
  ariaLabel = label || wrapClass || className,
  children,
  ...props
}) => {
  const innerButton = (_props) => (
    <button
      className={`${primary ? 'primary' : ''} ${
        xs ? 'btn--xs' : ''
      } ${className} mb-1`}
      ariaLabel={ariaLabel}
      {..._props}
    >
      {label || children}
    </button>
  );

  if (to)
    return (
      <Link to={to} {...props}>
        {innerButton()}
      </Link>
    );

  if (!wrapClass) return innerButton(props);

  return <div className={wrapClass}>{innerButton(props)}</div>;
};

export default Button;
