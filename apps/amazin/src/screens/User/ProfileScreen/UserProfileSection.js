import { useSelector } from 'react-redux';
import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';

export default function UserProfileSection(props) {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const userDetails = useSelector((state) => state.userDetails);

  const { name, setName, email, setEmail, setPassword, setOldPassword, setConfirmPassword } = props;

  return userDetails?.user ? (
    <>
      <LoadingOrError xl statusOf={userUpdateProfile} />

      <CustomInput text="Name" hook={[name, setName]} />
      <CustomInput text="Email" type="email" hook={[email, setEmail]} />

      <PrivateRoute path="/profile/password" exact>
        <CustomInput wrapClass="flex-col" text="Old Password" type="password" onChange={setOldPassword} />
      </PrivateRoute>

      <CustomInput text="Password" type="password" onChange={setPassword} />
      <CustomInput text="Confirm Password" type="password" autoComplete="off" onChange={setConfirmPassword} />
    </>
  ) : null;
}
