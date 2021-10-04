import { memo } from 'react';

import InnerMenuItem, { MenuItemProps } from './InnerMenuItem';

export const mapArgsToProps = ([label, to, className, extFunction]: ArgsType, id: number) => ({
  label,
  to,
  className,
  extFunction,
  key: `${id} ${label || className}`
});

export const NavCategoryAdapter = (cat: string) => [cat, '/search/category/' + cat];

type Props = MenuItemProps & {
  key?: string;
};

function MenuItem({ label, ...rest }: Props) {
  if (label === 'separator') return <li className="separator" />;
  return (
    <li>
      <InnerMenuItem label={label} {...rest} />
    </li>
  );
}

export default memo(MenuItem, (prev, next) => prev.label === next.label);
