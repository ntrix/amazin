import Header from 'src/layouts/Header';
import LoadingOrError from '../components/LoadingOrError';
import Button from '../components/Button';

export default function Form({ header, statusOf, children, btn, more, ...props }) {
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
