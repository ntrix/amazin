import React from 'react';
import { Link } from 'react-router-dom';

export function _Pagination({
  getUrl,
  page,
  pages,
  className = '',
  help = false,
  LinkTo = (props) => <Link {...props} />
}) {
  return (
    <>
      <div className="row center pagination">
        {[...Array(pages || 0).keys()].map((x) => (
          <LinkTo
            key={x}
            className={`${x + 1 === page ? 'active' : ''} ${className}`}
            to={getUrl({ page: x + 1 })}
          >
            {x + 1}
          </LinkTo>
        ))}
      </div>

      {!!help && (
        <div>
          <h2>Do you need help?</h2>

          <p>
            Visit the{' '}
            <LinkTo to="/customer">
              <b>help section</b>
            </LinkTo>
            {' or '}
            <LinkTo to="/contact/subject/Help">
              <b>contact us</b>
            </LinkTo>
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
