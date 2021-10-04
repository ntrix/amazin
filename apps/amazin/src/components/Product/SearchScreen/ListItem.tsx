import { Link } from 'react-router-dom';

import { FilterOptType } from 'src/constants';

type ItemProps = {
  to?: ToType;
  text?: string;
  children?: Children;
  rest?: RestProps;
  isActive?: boolean;
};

export default function ListItem({ to, isActive = false, text, children, ...rest }: ItemProps) {
  return (
    <li>
      <Link {...rest} className={isActive ? 'active' : ''} to={to}>
        {text || children}
      </Link>
    </li>
  );
}

export function createListItem(getUrlFunction: FnType) {
  return ({ filter, ...rest }: { filter: FilterOptType } & ItemProps) => (
    <ListItem {...rest} to={getUrlFunction(filter)} />
  );
}
