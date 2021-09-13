import { Link } from 'react-router-dom';
import { LazyImg } from 'src/apis/suspenseAPI';
import { SuspenseText } from 'src/components/CustomSuspense';

export default function SellerSlide({
  seller: {
    seller: { logo, name },
    _id
  }
}) {
  return (
    <SuspenseText text="Seller">
      <Link className="seller__card" to={`/seller/${_id}`}>
        <LazyImg className="seller__img" src={logo} alt={name} />
        <p className="legend">{name}</p>
      </Link>
    </SuspenseText>
  );
}
