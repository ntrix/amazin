import { useState } from 'react';

import { useUserEdit } from './useUserEdit';
import Form from 'src/layouts/Form';
import CustomInput from 'src/components/CustomInput';
import CustomCheck from 'src/components/CustomCheck';

export default function UserEditScreen({ history, match }: RouteProps<MatchParams>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState<boolean>();
  const [isAdmin, setIsAdmin] = useState<boolean>();

  const editUser = useUserEdit([setName, setEmail, setIsSeller, setIsAdmin], history, match);
  const { user, loading, error, userUpdate, submitUser } = editUser;

  return user ? (
    <Form
      header={`Edit User ${name}`}
      statusOf={{ loading, error, ...userUpdate }}
      onSubmit={submitUser(name, email, isSeller, isAdmin)}
      btn="Update"
    >
      <CustomInput text="Name" hook={[name, setName]} />
      <CustomInput text="Email" type="email" hook={[email, setEmail]} />
      <CustomCheck text="Seller Account" checked={isSeller} onChange={setIsSeller} />
      <CustomCheck text="Administrator" checked={isAdmin} onChange={setIsAdmin} />
    </Form>
  ) : null;
}
