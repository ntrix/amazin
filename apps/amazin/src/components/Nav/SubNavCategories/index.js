import { memo } from 'react';
import { useSelector } from 'react-redux';
import LoadingOrError from '../../LoadingOrError';
import SubNavItem from './SubNavItem';

function SubNavCategories({ first, ...props }) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories = [] } = productCategoryList;
  return (
    <header className="screen__header">
      <ul className="cat-nav">
        {[first, ...categories].map((_cat, id) => (
          <SubNavItem key={id} _cat={_cat} {...props} />
        ))}
        <LoadingOrError statusOf={productCategoryList} />
      </ul>
    </header>
  );
}

export default memo(SubNavCategories);
