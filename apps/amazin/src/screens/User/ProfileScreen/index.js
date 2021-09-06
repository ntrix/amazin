import { useSelector } from 'react-redux';

import { useUserProfile, useSellerProfile } from './useProfile';
import Form from 'src/layouts/Form';
import UserProfileSection from './UserProfileSection';
import SellerProfileSection from './SellerProfileSection';
import MessageBox from 'src/components/MessageBox';

export default function ProfileScreen() {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userDetails = useSelector((state) => state.userDetails);

  const { submitUpdate, ...userProfile } = useUserProfile();
  const sellerProfile = useSellerProfile();
  const { sellerName, sellerLogo, sellerDescription } = sellerProfile;

  return (
    <Form
      header="User Profile"
      statusOf={userDetails}
      onSubmit={(e) => submitUpdate(e, { sellerName, sellerLogo, sellerDescription })}
      btn="Update"
    >
      <UserProfileSection {...userProfile} />

      <SellerProfileSection {...sellerProfile} />

      <MessageBox variant="success" show={userDetails?.user && userUpdateProfile.success}>
        Profile Updated Successfully
      </MessageBox>
    </Form>
  );
}
