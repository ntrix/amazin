import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

const defaultTitle = 'SORRY! Something wrong happens!';

function ErrorBaseWithBtn({ title = defaultTitle, subTitle = '', message, children }) {
  return (
    <>
      <div className="c-screen customer">
        <div className="container">
          <h1 className="title">{title}</h1>
          <h3 className="sub-title">{subTitle}</h3>
        </div>
        <div className="divider-inner" />

        <div className="container">
          <MessageBox variant="danger" show children={message || children} />
        </div>
        <div className="divider-inner" />

        <div className="container">
          <Button primary to="/customer" label="Report this Error" />
          <Button to="/" className="ml-1" label="Back to Homepage" />
        </div>
      </div>
      <div className="divider" />
    </>
  );
}

export default ErrorBaseWithBtn;
