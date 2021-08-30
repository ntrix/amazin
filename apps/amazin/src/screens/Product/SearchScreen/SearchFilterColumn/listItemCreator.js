import { Link } from 'react-router-dom';

export default function Item({ to, active = false, text, children, ...props }) {
  return (
    <li>
      <Link {...props} className={active ? 'active' : ''} to={to}>
        {text || children}
      </Link>
    </li>
  );
}

export function createListItem(getUrlFunction) {
  return ({ filter, ...props }) => <Item {...props} to={getUrlFunction(filter)} />;
}
