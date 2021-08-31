import { useSelector } from 'react-redux';
import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';
import MessageBox from 'src/components/MessageBox';

export default function SellerProfileSection(props) {
  const userDetails = useSelector((state) => state.userDetails);
  const { sellerName, setSellerName, sellerLogo, setSellerLogo, sellerDescription, setSellerDescription } = props;

  return (
    <PrivateRoute path="/profile/seller" exact>
      {userDetails?.user?.isSeller ? (
        <>
          <h2 className="mt-1">Seller</h2>
          <CustomInput wrapClass="flex-col" text="Seller Name" hook={[sellerName, setSellerName]} />
          <CustomInput wrapClass="flex-col" text="Seller Logo" hook={[sellerLogo, setSellerLogo]} />
          <CustomInput
            wrapClass="flex-col"
            text="Seller Description"
            hook={[sellerDescription, setSellerDescription]}
          />
        </>
      ) : (
        <MessageBox variant="danger" show={!userDetails?.loading}>
          You don't have seller account, please apply first!
        </MessageBox>
      )}
    </PrivateRoute>
  );
}
