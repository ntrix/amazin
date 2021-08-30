import Button from 'src/components/Button';
import MessageBox from 'src/components/MessageBox';

export default function Screen404() {
  return (
    <>
      <div className="c-screen customer">
        <header className="container">
          <h1 className="title">SORRY! Something wrong happens!</h1>
          <h3 className="sub-title">
            The requested page could not be found! Please use the search function or go directly to Amazin'.
          </h3>
        </header>
        <div className="divider-inner"></div>
        <div className="container">
          <MessageBox variant="danger" show>
            <h2>404: Page not found</h2>
          </MessageBox>
        </div>
        <div className="divider-inner"></div>
        <div className="container">
          <Button primary to="/customer" label="Report this Error" />
          <Button to="/" className="ml-1" label="Back to Homepage" />
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
