import { useSelector } from 'react-redux';
import { useUserEdit } from './useUserEdit';
import Button from 'src/components/Button';
import CustomInput from 'src/components/CustomInput';
import LoadingOrError from 'src/components/LoadingOrError';
import CustomCheck from 'src/components/CustomCheck';

export default function UserEditScreen({ history, match }) {
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);

  const editUser = useUserEdit(history, match);
  const { name, setName, email, setEmail, seller, setSeller, admin, setAdmin, submitUser } = editUser;

  return (
    <div>
      <form className="form" onSubmit={submitUser}>
        <h1>Edit User {name}</h1>
        <LoadingOrError xl statusOf={{ ...userDetails, ...userUpdate }} />

        {userDetails?.success && (
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
