import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { pipe } from 'src/utils';
import { updateCurrencyRates } from 'src/apis/productAPI';
import { signin, updateUserProfile } from 'src/apis/userAPI';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';

export default function SigninScreen({ location, history }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      dispatch(updateCurrencyRates());
      if (userInfo.currency) pipe.setCurrency(userInfo.currency);
      else
        dispatch(
          updateUserProfile({
            userId: userInfo._id,
            currency: pipe.currency
          })
        );
      history.push(redirect);
    }
  }, [dispatch, history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <LoadingOrError statusOf={userSignin} />

        <CustomInput text="Email" type="email" required hook={[email, setEmail]} />
        <CustomInput text="Password" type="password" required hook={[password, setPassword]} />

        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>

        <div>
          <label />
          <div>
            New customer?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              <b>Create your account</b>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
