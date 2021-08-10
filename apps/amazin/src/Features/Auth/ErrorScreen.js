import { Link } from 'react-router-dom';
import MessageBox from '../../components/MessageBox';

/* TODO send errors report to server using Websocket */
const ErrorScreen = ({ error }) => (
  <div className="container">
    <div className="home-screen">
      <div className="c-screen customer">
        <h1 className="container">SORRY! Something wrong happens!</h1>
        <div className="divider-inner"></div>

        <div className="container">
          <MessageBox variant="danger" msg={error.message} />
        </div>
        <div className="divider-inner"></div>

        <div className="container">
          <Link to="/customer">
            <button className="primary mb-1">Report this Error</button>
          </Link>

          <Link to="/">
            <button className="ml-1 mb-1">Back to Homepage</button>
          </Link>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  </div>
);

export default ErrorScreen;
