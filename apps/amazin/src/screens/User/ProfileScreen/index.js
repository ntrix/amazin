import { useSelector } from 'react-redux';

import { useUserProfile, useSellerProfile } from './useProfile';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
import Button from 'src/components/Button';
import UserProfileSection from './UserProfileSection';
import SellerProfileSection from './SellerProfileSection';

export default function ProfileScreen() {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userDetails = useSelector((state) => state.userDetails);

  const { submitUpdate, ...userProfile } = useUserProfile();
  const sellerProfile = useSellerProfile();
  const { sellerName, sellerLogo, sellerDescription } = sellerProfile;

  return (
    <div>
      <form className="form" onSubmit={(e) => submitUpdate(e, { sellerName, sellerLogo, sellerDescription })}>
        <h1 className="mt-1">User Profile</h1>
        <LoadingOrError xl statusOf={userDetails} />

        <UserProfileSection {...userProfile} />

        <SellerProfileSection {...sellerProfile} />

        <MessageBox variant="success" show={userDetails?.user && userUpdateProfile.success}>
          Profile Updated Successfully
        </MessageBox>

        <Button primary fill type="submit" label="Update" />
      </form>
    </div>
  );
}
