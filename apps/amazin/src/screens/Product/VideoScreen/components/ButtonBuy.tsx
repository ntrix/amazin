import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { MovieType } from 'src/constants';
import { dummyMovies } from 'src/utils';

export type ButtonBuyProps = {
  movie?: MovieType;
  LinkTo?: Children;
};

function ButtonBuy({ movie = dummyMovies[0], LinkTo = (props: LinkProps) => <Link {...props} /> }: ButtonBuyProps) {
  return (
    <LinkTo
      disabled={!movie.seller}
      //is there any seller is selling this movie?
      to={movie.seller ? `/cart/${movie._id}?qty=1` : `#`}
    >
      <button className="banner__button" disabled={!movie.seller}>
        <i className="fa fa-shopping-cart"></i> Buy[Rent]
      </button>
    </LinkTo>
  );
}

export default memo(ButtonBuy);
