import { memo } from 'react';
import { useSelector } from 'react-redux';

import SubNavItem, { SubNavItemProps } from './SubNavItem';
import LoadingOrError from 'src/components/LoadingOrError';

type Props = SubNavItemProps & {
  first: string;
};

function SubNavCategories({ first, ...rest }: Props) {
  const productCategoryList = useSelector((state: AppState) => state.productCategoryList);
  const { categories = [] } = productCategoryList;

  return (
    <header className="screen__header">
      <ul className="cat-nav">
        {[first, ...categories].map((_cat) => (
          <SubNavItem key={_cat} _cat={_cat} {...rest} />
        ))}

        <LoadingOrError statusOf={productCategoryList} />
      </ul>
    </header>
  );
}

export default memo(SubNavCategories);
