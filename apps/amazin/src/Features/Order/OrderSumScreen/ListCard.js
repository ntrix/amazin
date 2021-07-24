import React from 'react';

import MessageBox from '../../../components/MessageBox';

function ListCard({ label, statusOf, textOf, when, children }) {
  return (
    <li className="card card__body">
      <div className="p-1">
        <h2>{label}</h2>
        <p>{children}</p>
        <MessageBox variant="success" show={statusOf}>
          {`${textOf} at ${when}`}
        </MessageBox>
        <MessageBox variant="danger" show={!statusOf}>
          {`Not ${textOf}`}
        </MessageBox>
      </div>
    </li>
  );
}

export default ListCard;
