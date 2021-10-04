import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SuspenseText } from 'src/components/CustomSuspense';
import { LazyImg } from 'src/apis/suspenseAPI';
import Rating from 'src/components/Rating';

type SellerCardProps = {
  seller: SellerType;
  size?: string;
  to?: string;
  rating?: boolean;
  mail?: boolean;
  info?: boolean;
};

/* don't show user {email} */
const DUMMY_EMAIL = 'a@b.cd';

function SellerCard({
  seller,
  size = 'small mr-1',
  to = '',
  rating = true,
  mail = false,
  info = false
}: SellerCardProps) {
  return (
    <div className="card card__body m-0">
      <div className="row start p-1">
        <SuspenseText text="Seller" children={<LazyImg className={size} src={seller?.logo} alt={seller?.name} />} />
        <h2>{to ? <Link to={to} children={seller?.name} /> : seller?.name}</h2>
      </div>

      {!!rating && <Rating rating={seller?.rating} numReviews={seller?.numReviews} />}
      {!!mail && <div children={<a href={`mailto:${DUMMY_EMAIL}`}>Contact Seller</a>} />}
      {!!info && <div>{seller?.description}</div>}
    </div>
  );
}

export default memo(SellerCard);
