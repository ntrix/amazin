import React from 'react';

import MessageBox from '../../../components/MessageBox';

function StatusBox({ textOf, statusOf, when }) {
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

export default StatusBox;
