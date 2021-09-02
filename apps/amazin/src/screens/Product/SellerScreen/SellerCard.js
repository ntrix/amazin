import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SuspenseSeller } from 'src/components/CustomSuspense';
import { LazyImg } from 'src/apis/suspenseAPI';
import Rating from 'src/components/Rating';
/* don't show user {email} */
function SellerCard({ user: { seller = {} }, size = 'small', to = '', rating = true, mail = false, info = false }) {
  return (
    <div className="card card__body m-0">
      <div className="row start p-1">
        <SuspenseSeller children={<LazyImg className={size} src={seller.logo} alt={seller.name} />} />
        <h2>{to ? <Link to={to}>{seller.name}</Link> : seller.name}</h2>
      </div>

      {!!rating && <Rating rating={seller.rating} numReviews={seller.numReviews} />}
      {!!mail && <div children={<a href={`mailto:${'a@b.c'}`}>Contact Seller</a>} />}
      {!!info && <div>{seller.description}</div>}
    </div>
  );
}

export default memo(SellerCard);
