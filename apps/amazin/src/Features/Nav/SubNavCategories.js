import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingOrError from '../../components/LoadingOrError';

export function _SubNavCategories({
  first,
  hook: { getFilterUrl, category, setCat }
}) {
  const productCategoryList = useSelector((state) => state.productCategoryList);

  return (
    <header className="screen__header">
      <ul className="cat-nav">
        <LoadingOrError statusOf={productCategoryList} />

        {productCategoryList.categories &&
          [first, ...productCategoryList.categories].map((label, id) => (
            <li
              key={id}
              className={label === category ? 'active' : ''}
              onClick={setCat ? () => setCat(label) : null}
            >
              {getFilterUrl ? (
                <Link to={getFilterUrl({ category: label, page: 1 })}>
                  {label}
                </Link>
              ) : (
                label
              )}
            </li>
          ))}
      </ul>
    </header>
  );
}

const SubNavCategories = React.memo(_SubNavCategories);
export default SubNavCategories;
