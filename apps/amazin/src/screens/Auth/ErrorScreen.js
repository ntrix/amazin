import ErrorBaseWithBtn from './ErrorBaseWithBtn';

function ErrorScreen({ error }) {
  return (
    <div className="container">
      <div className="home-screen">
        {/* TODO option to choose send errors report to server using Websocket */}

        <ErrorBaseWithBtn message={error.message} />
      </div>
    </div>
  );
}

export default ErrorScreen;
