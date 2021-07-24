import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingOrError from '../../components/LoadingOrError';

export function _SubNavCategories({
  first,
  hook: { getFilterUrl, category, setCat }
}) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories = [] } = productCategoryList;

  return (
    <header className="screen__header">
      <ul className="cat-nav">
        {[first, ...categories].map((label, id) => (
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

        <LoadingOrError statusOf={productCategoryList} />
      </ul>
    </header>
  );
}

const SubNavCategories = React.memo(_SubNavCategories);
export default SubNavCategories;
