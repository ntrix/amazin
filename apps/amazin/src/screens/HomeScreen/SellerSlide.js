import { Link } from 'react-router-dom';
import { LazyImg } from 'src/apis/suspenseAPI';
import { SuspenseSeller } from 'src/components/CustomSuspense';

export default function SellerSlide({
  seller: {
    seller: { logo, name },
    _id
  }
}) {
  return (
    <SuspenseSeller>
      <Link className="seller__card" to={`/seller/${_id}`}>
        <LazyImg className="seller__img" src={logo} alt={name} />
        <p className="legend">{name}</p>
      </Link>
    </SuspenseSeller>
  );
}
