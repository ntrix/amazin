import { memo } from 'react';
import { Link } from 'react-router-dom';
import { splitBoldTexts } from 'src/utils';

export type SuggestRowProps = {
  row: string;
  onClick: FnType;
  onMouseEnter: FnType;
};

function SuggestRow({ row, onClick, onMouseEnter }: SuggestRowProps) {
  const cells = splitBoldTexts(row);
  const text = cells.join('');
  return (
    <Link
      to={`/search/name/${text}`}
      onMouseEnter={onMouseEnter}
      onClick={() => {
        onClick(text);
      }}
    >
      {cells.map((cell, id) => (
        <span key={id}>{id & 1 ? <b>{cell}</b> : <span>{cell}</span>}</span>
      ))}
    </Link>
  );
}

export default memo(SuggestRow);
