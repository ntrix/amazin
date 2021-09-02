import { memo, Suspense } from 'react';
import { Link } from 'react-router-dom';

import { LazyImg } from 'src/apis/suspenseAPI';
import Rating from 'src/components/Rating';

function SellerCard({
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
            <Suspense fallback={<h4>Seller</h4>}>
              {seller.logo ? (
                <div className="p-1">
                  <LazyImg className={size} src={seller.logo} alt={seller.name} />
                </div>
              ) : (
                <h4>Seller</h4>
              )}
            </Suspense>

            <div className="p-1">
              <h2>{linkTo ? <Link to={linkTo}>{seller.name}</Link> : seller.name}</h2>
            </div>
          </div>
        </li>

        {!!rating && (
          <li>
            <Rating rating={seller.rating} numReviews={seller.numReviews}></Rating>
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

export default memo(SellerCard);
