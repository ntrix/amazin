import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { subjectTemplate } from './SubjectTemplate';
import LoadingOrError from 'src/components/LoadingOrError';

export default function ContactSubject({ hook: [subject, setSubject] }) {
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { subject: paramSub } = useParams();
  const { userInfo } = useSelector((state) => state.userSignin);

  return (
    <>
      <LoadingOrError xl statusOf={userUpdateProfile} />
      <div>
        <label htmlFor="subject">Subject</label>
        <div className="select-wrapper">
          <div className="sprite__caret xl"></div>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            {!userInfo?.isSeller && 'Seller' === paramSub && <option value="Seller">Verify My Seller Account</option>}
            {!userInfo?.isAdmin && 'Admin' === paramSub && <option value="Admin">Apply To Be Administrator</option>}
            {subjectTemplate.map((opt, id) => (
              <option key={id} value={opt.split(' ')[0]} children={opt} />
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
