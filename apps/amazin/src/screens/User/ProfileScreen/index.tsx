import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useUserProfile } from './useProfile';
import { DUMMY_SELLER } from 'src/constants';
import Form from 'src/layouts/Form';
import PasswordSection from './PasswordSection';
import SellerProfileSection from './SellerProfileSection';
import CustomInput from 'src/components/CustomInput';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

export default function ProfileScreen() {
  const userDetails: UserDetailType = useSelector((state: AppState) => state.userDetails);
  const userUpdateProfile: StatusType = useSelector((state: AppState) => state.userUpdateProfile);

  const [passwords, setPasswords] = useState(['', undefined]);
  const { name, setName, email, setEmail, submitUpdate } = useUserProfile(userDetails?.user, setPasswords);
  const [seller, setSeller] = useState<SellerType>(userDetails?.user?.seller ?? DUMMY_SELLER.seller);

  useEffect(() => {
    if (userDetails?.user?.seller) setSeller(userDetails?.user?.seller);
  }, [userDetails, setSeller]);

  return (
    <Form
      header="User Profile"
      statusOf={userDetails}
      onSubmit={(e) => submitUpdate(e, passwords, seller)}
      btn="Update"
    >
      <LoadingOrError xl statusOf={userUpdateProfile} />

      {!!userDetails?.user && (
        <>
          <CustomInput text="Name" hook={[name, setName]} />
          <CustomInput text="Email" type="email" hook={[email, setEmail]} />
          <PasswordSection hook={[passwords, setPasswords]} />
        </>
      )}

      <SellerProfileSection userDetails={userDetails} seller={seller} setSeller={setSeller} />

      <MessageBox variant="success" show={userDetails?.user && userUpdateProfile.success}>
        Profile Updated Successfully
      </MessageBox>
    </Form>
  );
}
