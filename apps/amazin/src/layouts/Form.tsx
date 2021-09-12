import Header from 'src/layouts/Header';
import LoadingOrError from '../components/LoadingOrError';
import Button from '../components/Button';

type PropType = {
  header?: string | undefined;
  statusOf?: Status;
  children?: Children;
  btn?: string | undefined;
  more?: Children;
  props?: Props;
};

export default function Form({ header, statusOf, children, btn, more, ...props }: PropType) {
  return (
    <form className="form" {...props}>
      {header && <Header label={header} />}
      {statusOf && <LoadingOrError statusOf={statusOf} />}
      {children}
      {btn && <Button primary fill type="submit" label={btn} />}
      {more}
    </form>
  );
}
