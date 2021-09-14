import { Link } from 'react-router-dom';

type PropType = {
  to?: string;
  text?: string;
  children?: Children;
  rest?: Props;
  isActive?: boolean;
};

export default function Item({ to, isActive = false, text, children, ...rest }: PropType) {
  return (
    <li>
      <Link {...rest} className={isActive ? 'active' : ''} to={to}>
        {text || children}
      </Link>
    </li>
  );
}

export function createListItem(getUrlFunction: FnType) {
  return ({ filter, ...rest }: { filter: FilterOptType } & PropType) => <Item {...rest} to={getUrlFunction(filter)} />;
}
