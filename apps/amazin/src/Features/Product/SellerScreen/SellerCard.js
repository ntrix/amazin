import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../../../components/Rating';

export function _SellerCard({
  user: { /*email,*/ seller = {} },
  size = 'small',
  linkTo = false,
  rating = true,
  mailTo = false,
  info = false
}) {
  return (
    <div className="card card__body m-0">
      <ul>
        <li>
          <div className="row start">
            {seller.logo ? (
              <div className="p-1">
                <img className={size} src={seller.logo} alt={seller.name}></img>
              </div>
            ) : (
              <h4>Seller</h4>
            )}

            <div className="p-1">
              <h2>
                {linkTo ? <Link to={linkTo}>{seller.name}</Link> : seller.name}
              </h2>
            </div>
          </div>
        </li>

        {!!rating && (
          <li>
            <Rating
              rating={seller.rating}
              numReviews={seller.numReviews}
            ></Rating>
          </li>
        )}

        {!!mailTo && (
          <li>
            <a href={`mailto:${'a@b.c'}`}>Contact Seller</a>
          </li>
        )}

        {!!info && <li>{seller.description}</li>}
      </ul>
    </div>
  );
}

const SellerCard = React.memo(_SellerCard);
export default SellerCard;
