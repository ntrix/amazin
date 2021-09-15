import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

type PropType = {
  msg?: string | undefined;
  back?: string | undefined;
  label?: string | undefined;
  props?: Props;
  className?: string;
};

export default function SuccessModal({ msg, back = '/', label = 'Back To Your Last Session', ...props }: PropType) {
  if (!msg) return null;
  /* TODO shadow under modal?? */
  return (
    <div {...props}>
      <MessageBox variant="success" msg={msg} />
      <br />
      <Button primary to={back} label={label} />
      <div className="separator divider-inner" />
    </div>
  );
}
