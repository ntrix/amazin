import ErrorBaseWithBtn from 'src/components/Auth/SigninScreen/ErrorBaseWithBtn';
import { LazyImg } from 'src/apis/suspenseAPI';
import NotFoundGIF from 'src/assets/img/travoltaNotFound.gif';

const errorMessage = 'The requested page could not be found! Please check the URL or use the search function.';

export default function Screen404() {
  return (
    <ErrorBaseWithBtn subTitle={errorMessage}>
      <h2>404: Page not found</h2>
      <LazyImg src={NotFoundGIF} />
    </ErrorBaseWithBtn>
  );
}
