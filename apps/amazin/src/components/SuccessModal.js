import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

export default function SuccessModal({ msg, back = '/', label = 'Back To Your Last Session' }) {
  if (!msg) return null;
  /* TODO shadow under modal?? */
  return (
    <>
      <MessageBox variant="success" msg={msg} />
      <br />
      <Button primary to={back} label={label} />
      <div className="separator divider-inner" />
    </>
  );
}
