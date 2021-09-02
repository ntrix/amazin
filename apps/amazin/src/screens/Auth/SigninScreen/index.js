import { useState } from 'react';
import Button from 'src/components/Button';

import { useSigninEffect } from './useSigninEffect';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import PageRedirect from 'src/components/PageRedirect';
import Header from 'src/layouts/Header';

export default function SigninScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { redirect, userSignin, submitSignin } = useSigninEffect(location, history);

  return (
    <div>
      <form className="form" onSubmit={(e) => submitSignin(e, { email, password })}>
        <Header label="Sign In" />
        <LoadingOrError statusOf={userSignin} />

        <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
        <CustomInput text="Password" type="password" required hook={[password, setPassword]} />
        <br />
        <Button primary fill type="submit" label="Sign In" />

        <PageRedirect to={`/register?redirect=${redirect}`} label="New customer?">
          <b>Create your account</b>
        </PageRedirect>
      </form>
    </div>
  );
}
