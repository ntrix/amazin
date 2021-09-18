import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';

export default function PasswordSection({
  hook: [passwords, setPasswords]
}: {
  hook: [(string | undefined)[], SetStateType<(string | undefined)[]>];
}) {
  const setPassword: FnType = (id: number) => (pw: string) => {
    const _passwords = passwords.slice(0);
    _passwords[id] = pw;
    setPasswords(_passwords);
  };

  return (
    <>
      <PrivateRoute path="/profile/password" exact>
        <CustomInput wrapClass="flex-col" text="Old Password" type="password" hook={[passwords[0], setPassword(0)]} />
      </PrivateRoute>

      <CustomInput text="Password" type="password" hook={[passwords[1], setPassword(1)]} />
      <CustomInput text="Confirm Password" type="password" autoComplete="off" hook={[passwords[2], setPassword(2)]} />
    </>
  );
}
