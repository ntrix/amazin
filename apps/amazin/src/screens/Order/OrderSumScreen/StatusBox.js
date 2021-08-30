import MessageBox from 'src/components/MessageBox';

export default function StatusBox({ textOf, statusOf, when }) {
  return (
    <>
      <MessageBox variant="success" show={statusOf}>
        {`${textOf} at ${Date(when).slice(0, 15)}`}
      </MessageBox>

      <MessageBox variant="danger" show={!statusOf}>
        {`Not ${textOf}`}
      </MessageBox>
    </>
  );
}
