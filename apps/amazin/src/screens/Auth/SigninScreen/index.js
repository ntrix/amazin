import { useState } from 'react';

import { useSigninEffect } from './useSigninEffect';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import PageRedirect from 'src/components/PageRedirect';

export default function SigninScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { redirect, userSignin, submitSignin } = useSigninEffect(location, history);

  return (
    <Form
      onSubmit={(e) => submitSignin(e, { email, password })}
      header="Sign In"
      statusOf={userSignin}
      btn="Sign In"
      more={
        <PageRedirect to={`/register?redirect=${redirect}`} label="New customer?">
          <b>Create your account</b>
        </PageRedirect>
      }
    >
      <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
      <CustomInput text="Password" type="password" required hook={[password, setPassword]} />
      <br />
    </Form>
  );
}
