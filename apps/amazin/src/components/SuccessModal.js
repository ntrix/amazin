import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

export default function SuccessModal({ msg, back = '/', label = 'Back To Your Last Session' }) {
  return (
    <>
      <MessageBox variant="success" show>
        {msg}
      </MessageBox>
      <br />
      <Button to={back} primary label={label} />
      <div className="separator divider-inner" />
    </>
  );
}
