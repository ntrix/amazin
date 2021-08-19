import React from 'react';
import { Link } from 'react-router-dom';

export function _Pagination({ getUrl, page, pages, help = false }) {
  return (
    <>
      <div className="row center pagination">
        {[...Array(pages || 0).keys()].map((x) => (
          <Link
            key={x}
            className={x + 1 === page ? 'active' : ''}
            to={getUrl({ page: x + 1 })}
          >
            {x + 1}
          </Link>
        ))}
      </div>

      {!!help && (
        <div>
          <h2>Do you need help?</h2>

          <p>
            Visit the{' '}
            <Link to="/customer">
              <b>help section</b>
            </Link>
            {' or '}
            <Link to="/contact/subject/Help">
              <b>contact us</b>
            </Link>
            <br />
            <br />
          </p>
        </div>
      )}
    </>
  );
}

const Pagination = React.memo(_Pagination);
export default Pagination;
