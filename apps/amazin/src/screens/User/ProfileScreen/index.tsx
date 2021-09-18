import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useUserProfile } from './useProfile';
import { DUMMY_SELLER } from 'src/constants';
import Form from 'src/layouts/Form';
import UserProfileSection from './UserProfileSection';
import SellerProfileSection from './SellerProfileSection';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

export default function ProfileScreen() {
  const userUpdateProfile: StatusType = useSelector((state: AppState) => state.userUpdateProfile);
  const userDetails: UserDetailType = useSelector((state: AppState) => state.userDetails);

  const { submitUpdate, ...userProfileHooks } = useUserProfile(userDetails);
  const [seller, setSeller] = useState<SellerType>(userDetails?.user?.seller ?? DUMMY_SELLER.seller);

  useEffect(() => {
    if (userDetails?.user?.seller) setSeller(userDetails?.user?.seller);
  }, [userDetails, setSeller]);

  return (
    <Form header="User Profile" statusOf={userDetails} onSubmit={(e) => submitUpdate(e, seller)} btn="Update">
      <LoadingOrError xl statusOf={userUpdateProfile} />

      <UserProfileSection userDetails={userDetails} hooks={userProfileHooks} />

      <SellerProfileSection userDetails={userDetails} seller={seller} setSeller={setSeller} />

      <MessageBox variant="success" show={userDetails?.user && userUpdateProfile.success}>
        Profile Updated Successfully
      </MessageBox>
    </Form>
  );
}
