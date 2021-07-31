import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingOrError from '../../components/LoadingOrError';

export function _SubNavCategories({
  first,
  category,
  getUrl,
  onPreload,
  changeCategory
}) {
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { categories = [] } = productCategoryList;

  return (
    <header className="screen__header">
      <ul className="cat-nav">
        {[first, ...categories].map((_cat, id) => (
          <li
            key={id}
            className={_cat === category ? 'active' : ''}
            onClick={changeCategory ? () => changeCategory(_cat) : null}
            onMouseEnter={onPreload ? () => onPreload(_cat) : null}
            onFocus={onPreload ? () => onPreload(_cat) : null}
          >
            {getUrl ? (
              <Link to={getUrl({ category: _cat, page: 1 })}>{_cat}</Link>
            ) : (
              _cat
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
