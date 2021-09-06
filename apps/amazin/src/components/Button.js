import { memo } from 'react';
import { Link } from 'react-router-dom';

function Button({
  label = '',
  primary = false,
  fill = false,
  xs = false,
  className = '',
  ariaLabel = label || className,
  children,
  ...props
}) {
  const classNames = [
    primary ? 'primary ' : '',
    fill ? 'col-fill ' : '',
    xs ? 'btn--xs ' : '',
    'mt-1 mb-2 ',
    className
  ].join('');

  return <button className={classNames} aria-label={ariaLabel} {...props} children={label || children} />;
}

function OuterButton({ wrapClass = '', to = '', ...props }) {
  if (to) return <Link to={to} children={<Button {...props} />} />;
  if (!wrapClass) return <Button {...props} />;
  return (
    <div className={wrapClass}>
      <Button {...props} />
    </div>
  );
}

export default memo(OuterButton);
