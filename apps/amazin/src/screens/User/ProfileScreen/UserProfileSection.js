import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';

export default function UserProfileSection({ userDetails, hooks }) {
  const { name, setName, email, setEmail, setPassword, setOldPassword, setConfirmPassword } = hooks;

  return userDetails?.user ? (
    <>
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
