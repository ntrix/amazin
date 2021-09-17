import { Link } from 'react-router-dom';
import { LazyImg } from 'src/apis/suspenseAPI';
import { SuspenseText } from 'src/components/CustomSuspense';
import { DUMMY_SELLER } from 'src/constants';

export default function SellerSlide({ user }: { user: UserType }) {
  const { logo, name } = user?.seller ?? DUMMY_SELLER.seller;

  return (
    <SuspenseText text="Seller">
      <Link className="seller__card" to={`/seller/${user._id}`}>
        <LazyImg className="seller__img" src={logo} alt={name} />
        <p className="legend">{name}</p>
      </Link>
    </SuspenseText>
  );
}
