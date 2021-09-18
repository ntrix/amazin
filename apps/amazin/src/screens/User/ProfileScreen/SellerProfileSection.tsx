import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';
import MessageBox from 'src/components/MessageBox';

type PropType = {
  userDetails: UserDetailType;
  seller: SellerType;
  setSeller: SetStateType<SellerType>;
};

export default function SellerProfileSection({ userDetails, seller, setSeller }: PropType) {
  const setName: FnType = (name: string) => setSeller({ ...seller, name });
  const setLogo: FnType = (logo: string) => setSeller({ ...seller, logo });
  const setDescription: FnType = (description: string) => setSeller({ ...seller, description });

  return (
    <PrivateRoute path="/profile/seller" exact>
      {userDetails?.user?.isSeller ? (
        <>
          <h2 className="mt-1">Seller</h2>
          <CustomInput wrapClass="flex-col" text="Seller Name" hook={[seller.name, setName]} />
          <CustomInput wrapClass="flex-col" text="Seller Logo" hook={[seller.logo, setLogo]} />
          <CustomInput wrapClass="flex-col" text="Seller Description" hook={[seller.description, setDescription]} />
        </>
      ) : (
        <MessageBox variant="danger" show={!userDetails?.loading}>
          You don't have seller account, please apply first!
        </MessageBox>
      )}
    </PrivateRoute>
  );
}
