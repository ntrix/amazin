import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { subjectTemplate } from './SubjectTemplate';
import LoadingOrError from 'src/components/LoadingOrError';
import CustomSelect from 'src/components/CustomSelect';

export default function ContactSubject({ hook: [subject, setSubject] }) {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { subject: paramSub } = useParams();
  const {
    userInfo: { isSeller, isAdmin }
  } = useSelector((state) => state.userSignin);

  const subjectOptions = subjectTemplate.map((opt) => ({ value: opt.split(' ')[0], children: opt }));
  if (!isAdmin && 'Admin' === paramSub) subjectOptions.push({ value: 'Admin', children: 'Apply To Be Administrator' });
  if (!isSeller && 'Seller' === paramSub)
    subjectOptions.push({ value: 'Seller', children: 'Verify My Seller Account' });

  return (
    <>
      <LoadingOrError xl statusOf={userUpdateProfile} />
      <CustomSelect
        label="Subject"
        list={subjectOptions}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
    </>
  );
}
