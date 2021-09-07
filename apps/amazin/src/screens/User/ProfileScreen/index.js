import { useSelector } from 'react-redux';

import { useUserProfile, useSellerProfile } from './useProfile';
import Form from 'src/layouts/Form';
import UserProfileSection from './UserProfileSection';
import SellerProfileSection from './SellerProfileSection';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';

export default function ProfileScreen() {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userDetails = useSelector((state) => state.userDetails);

  const { submitUpdate, ...userProfileHooks } = useUserProfile(userDetails);
  const sellerProfileHooks = useSellerProfile(userDetails);
  const { sellerName, sellerLogo, sellerDescription } = sellerProfileHooks;

  return (
    <Form
      header="User Profile"
      statusOf={userDetails}
      onSubmit={(e) => submitUpdate(e, { sellerName, sellerLogo, sellerDescription })}
      btn="Update"
    >
      <LoadingOrError xl statusOf={userUpdateProfile} />

      <UserProfileSection userDetails={userDetails} hooks={userProfileHooks} />

      <SellerProfileSection userDetails={userDetails} hooks={sellerProfileHooks} />

      <MessageBox variant="success" show={userDetails?.user && userUpdateProfile.success}>
        Profile Updated Successfully
      </MessageBox>
    </Form>
  );
}
