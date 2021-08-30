import { memo } from 'react';
import { Link } from 'react-router-dom';

import { sourceAdapter } from 'src/utils';

function ButtonBuy({ movie = sourceAdapter([1])[0], LinkTo = (props) => <Link {...props} /> }) {
  return (
    <LinkTo
      disabled={!movie.seller}
      //is there any seller sells this movie?
      to={movie.seller ? `/cart/${movie._id}?qty=1` : `#`}
    >
      <button className="banner__button" disabled={!movie.seller}>
        <i className="fa fa-shopping-cart"></i> Buy[Rent]
      </button>
    </LinkTo>
  );
}

export default memo(ButtonBuy);
