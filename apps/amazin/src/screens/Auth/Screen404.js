import ErrorBaseWithBtn from './ErrorBaseWithBtn';
import { LazyImg } from 'src/utils/suspenseClient';
import NotFoundGIF from '../../img/travoltaNotFound.gif';

const errorMessage = 'The requested page could not be found! Please check the URL or use the search function.';

export default function Screen404() {
  return (
    <ErrorBaseWithBtn subTitle={errorMessage}>
      <h2>404: Page not found</h2>
      <LazyImg src={NotFoundGIF} />
    </ErrorBaseWithBtn>
  );
}
