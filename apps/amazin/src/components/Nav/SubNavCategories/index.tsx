import { memo } from 'react';
import { useSelector } from 'react-redux';

import SubNavItem from './SubNavItem';
import LoadingOrError from 'src/components/LoadingOrError';

type PropType = {
  first: string;
  rest?: Props;
  category?: string;
  onPreload?: FnType;
  changeCat?: SetState;
};

function SubNavCategories({ first, ...rest }: PropType) {
  const productCategoryList = useSelector((state: AppState) => state.productCategoryList);
  const { categories = [] } = productCategoryList;

  return (
    <header className="screen__header">
      <ul className="cat-nav">
        {[first, ...categories].map((_cat, id) => (
          <SubNavItem key={id} _cat={_cat} {...rest} />
        ))}

        <LoadingOrError statusOf={productCategoryList} />
      </ul>
    </header>
  );
}

export default memo(SubNavCategories);
