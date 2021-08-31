import { useState } from 'react';
import Button from 'src/components/Button';

import { useSigninEffect } from './useSigninEffect';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import PageRedirect from 'src/components/PageRedirect';

export default function SigninScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { redirect, userSignin, submitSignin } = useSigninEffect(location, history);

  return (
    <div>
      <form className="form" onSubmit={(e) => submitSignin(e, { email, password })}>
        <h1>Sign In</h1>
        <LoadingOrError statusOf={userSignin} />

        <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
        <CustomInput text="Password" type="password" required hook={[password, setPassword]} />
        <br />
        <Button primary className="mt-1 col-fill" type="submit" label="Sign In" />

        <PageRedirect to={`/register?redirect=${redirect}`} label="New customer?">
          <b>Create your account</b>
        </PageRedirect>
      </form>
    </div>
  );
}
