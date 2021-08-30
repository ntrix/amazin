import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import LoadingOrError from 'src/components/LoadingOrError';

const subjectTemplate = [
  'Account',
  'Ads - Advertisement',
  'Customer Service',
  'FAQ',
  'Help Desk',
  'Orders - Your Order(s)',
  'Payment',
  'Report Something Suspicious',
  'Returns & Refund',
  'Shipping Address',
  'Others ..'
];

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
            {subjectTemplate.map((opt) => (
              <option value={opt.split(' ')[0]}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
