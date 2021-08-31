import { useState } from 'react';

import { useRegisterEffect } from './useRegisterEffect';
import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import PageRedirect from 'src/components/PageRedirect';

export default function RegisterScreen({ location, history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { redirect, userRegister, submitRegister } = useRegisterEffect(location, history);

  return (
    <div>
      <form className="form" onSubmit={(e) => submitRegister(e, { name, email, password, confirmPassword })}>
        <h1>Create Account</h1>
        <LoadingOrError statusOf={userRegister} />

        <CustomInput text="Name" required hook={[name, setName]} />
        <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
        <CustomInput text="Password" type="password" required hook={[password, setPassword]} />
        <CustomInput text="Confirm Password" type="password" required hook={[confirmPassword, setConfirmPassword]} />
        <br />
        <Button primary className="mt-1 col-fill" type="submit" label="Register" />

        <PageRedirect label="Already have an account?" to={`/signin?redirect=${redirect}`}>
          <b>Sign-In</b>
        </PageRedirect>
      </form>
    </div>
  );
}
