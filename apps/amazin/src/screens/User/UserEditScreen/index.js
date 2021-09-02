import { useState } from 'react';

import { useUserEdit } from './useUserEdit';
import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import CustomCheck from 'src/components/CustomCheck';

export default function UserEditScreen({ history, match }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seller, setSeller] = useState(false);
  const [admin, setAdmin] = useState(false);

  const editUser = useUserEdit([setName, setEmail, setSeller, setAdmin], history, match);
  const { user, loading, error, userUpdate, submitUser } = editUser;

  return (
    <div>
      <form className="form" onSubmit={submitUser(name, email, seller, admin)}>
        <h1>Edit User {name}</h1>
        <LoadingOrError xl statusOf={{ loading, error, ...userUpdate }} />

        {!!user && (
          <>
            <CustomInput text="Name" hook={[name, setName]} />
            <CustomInput text="Email" type="email" hook={[email, setEmail]} />
            <CustomCheck text="Seller Account" checked={seller} onChange={setSeller} />
            <CustomCheck text="Administrator" checked={admin} onChange={setAdmin} />
            <Button primary fill type="submit" label="Update" />
          </>
        )}
      </form>
    </div>
  );
}
