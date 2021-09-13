import { useState } from 'react';

import { useRegisterEffect } from './useRegisterEffect';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import PageRedirect from 'src/components/PageRedirect';

export default function RegisterScreen({ location, history }: RouteOption) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { redirect, userRegister, submitRegister } = useRegisterEffect({ location, history });

  return (
    <Form
      header="Create Account"
      statusOf={userRegister}
      onSubmit={(e) => submitRegister(e, { name, email, password, confirmPassword })}
      btn="Register"
      more={
        <PageRedirect label="Already have an account?" to={`/signin?redirect=${redirect}`}>
          <b>Sign-In</b>
        </PageRedirect>
      }
    >
      <CustomInput text="Name" required hook={[name, setName]} />
      <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
      <CustomInput text="Password" type="password" required hook={[password, setPassword]} />
      <CustomInput text="Confirm Password" type="password" required hook={[confirmPassword, setConfirmPassword]} />
      <br />
    </Form>
  );
}
