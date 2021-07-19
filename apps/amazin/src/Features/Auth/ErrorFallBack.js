import MessageBox from '../../components/MessageBox';
import Screen404 from './Screen404';

/* TODO send errors report to server using Websocket */
const ErrorFallback = ({ error }) => (
  <div className="container">
    <div className="home-screen">
      <div className="home__banner home error-page">
        <MessageBox variant="danger" msg={error.message} />
      </div>
      <Screen404 />
    </div>
  </div>
);

export default ErrorFallback;
