import Header from 'src/layouts/Header';
import LoadingOrError from '../components/LoadingOrError';
import Button from '../components/Button';

export type FormProps = {
  onSubmit: FnType;
  header?: string;
  statusOf?: StatusType;
  children?: Children;
  btn?: string;
  more?: Children;
  rest?: RestProps;
};

export default function Form({ header, statusOf, children, btn, more, ...rest }: FormProps) {
  return (
    <form className="form" {...rest}>
      {header && <Header label={header} />}
      {statusOf && <LoadingOrError statusOf={statusOf} />}
      {children}
      {btn && <Button primary fill type="submit" label={btn} />}
      {more}
    </form>
  );
}
