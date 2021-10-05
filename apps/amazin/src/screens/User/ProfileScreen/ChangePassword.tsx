import PrivateRoute from 'src/routes/PrivateRoute';
import CustomInput from 'src/components/CustomInput';

export type ChangePasswordProps = {
  hook: [(string | undefined)[], SetStateType<(string | undefined)[]>];
};

export default function ChangePassword({ hook: [passwords, setPasswords] }: ChangePasswordProps) {
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

      <PrivateRoute path="/profile/password" exact>
        <CustomInput
          wrapClass="flex-col"
          text="Confirm Password"
          type="password"
          autoComplete="off"
          hook={[passwords[2], setPassword(2)]}
        />
      </PrivateRoute>
    </>
  );
}
