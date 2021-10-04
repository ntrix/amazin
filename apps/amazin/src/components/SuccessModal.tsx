import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

type SuccessModalProps = {
  msg?: string | string[];
  back?: string;
  label?: string;
  rest?: RestProps;
  className?: string;
};

export default function SuccessModal({
  msg,
  back = '/',
  label = 'Back To Your Last Session',
  ...rest
}: SuccessModalProps) {
  if (!msg) return null;
  /* TODO shadow under modal?? */
  return (
    <div {...rest}>
      <MessageBox variant="success" msg={msg} />
      <br />
      <Button primary to={back} label={label} />
      <div className="separator divider-inner" />
    </div>
  );
}
