import { Link } from 'react-router-dom';

const Button = ({
  to = '',
  label = '',
  primary = false,
  xs = false,
  className = '',
  children,
  ...props
}) => {
  const innerButton = (_props) => (
    <button
      className={`${primary ? 'primary' : ''} ${
        xs ? 'btn--xs' : ''
      } ${className} mb-1`}
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
  return innerButton(props);
};

export default Button;
