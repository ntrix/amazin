import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SuspenseText } from 'src/components/CustomSuspense';
import { LazyImg } from 'src/apis/suspenseAPI';
import Rating from 'src/components/Rating';

type PropType = {
  seller: SellerType;
  size?: string;
  to?: string;
  rating?: boolean;
  mail?: boolean;
  info?: boolean;
};

function SellerCard({
  /* don't show user {email} */
  seller,
  size = 'small mr-1',
  to = '',
  rating = true,
  mail = false,
  info = false
}: PropType) {
  return (
    <div className="card card__body m-0">
      <div className="row start p-1">
        <SuspenseText text="Seller" children={<LazyImg className={size} src={seller?.logo} alt={seller?.name} />} />
        <h2>{to ? <Link to={to}>{seller?.name}</Link> : seller?.name}</h2>
      </div>

      {!!rating && <Rating rating={seller?.rating} numReviews={seller?.numReviews} />}
      {!!mail && <div children={<a href={`mailto:${'a@b.c'}`}>Contact Seller</a>} />}
      {!!info && <div>{seller?.description}</div>}
    </div>
  );
}

export default memo(SellerCard);
