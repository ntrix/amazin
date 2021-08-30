import { memo } from 'react';
import InnerMenuItem from './InnerMenuItem';

export const mapArgsToProps = ([label, to, className, extFunction = null], id) => ({
  label,
  to,
  className,
  extFunction,
  key: `${id} ${label || className}`
});

export const NavCategoryAdapter = (cat) => [cat, '/search/category/' + cat];

function MenuItem({ label, ...props }) {
  if (label === 'separator') return <li className="separator" />;
  return <li children={<InnerMenuItem label={label} {...props} />} />;
}

export default memo(
  MenuItem,
  (prev, next) => prev.label === next.label && prev.to === next.to && prev.className === next.className
);
