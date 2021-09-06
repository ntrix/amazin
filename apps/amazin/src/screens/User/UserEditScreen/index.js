import { useState } from 'react';

import { useUserEdit } from './useUserEdit';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import CustomCheck from 'src/components/CustomCheck';

export default function UserEditScreen({ history, match }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seller, setSeller] = useState(false);
  const [admin, setAdmin] = useState(false);

  const editUser = useUserEdit([setName, setEmail, setSeller, setAdmin], history, match);
  const { user, loading, error, userUpdate, submitUser } = editUser;

  return user ? (
    <Form
      header={`Edit User ${name}`}
      statusOf={{ loading, error, ...userUpdate }}
      onSubmit={submitUser(name, email, seller, admin)}
      btn="Update"
    >
      <CustomInput text="Name" hook={[name, setName]} />
      <CustomInput text="Email" type="email" hook={[email, setEmail]} />
      <CustomCheck text="Seller Account" checked={seller} onChange={setSeller} />
      <CustomCheck text="Administrator" checked={admin} onChange={setAdmin} />
    </Form>
  ) : null;
}
