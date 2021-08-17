import Button from '../../components/Button';
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
          <Button primary to="/customer" label="Report this Error" />

          <Button to="/" className="ml-1" label="Back to Homepage" />
        </div>
      </div>
      <div className="divider"></div>
    </div>
  </div>
);

export default ErrorScreen;
