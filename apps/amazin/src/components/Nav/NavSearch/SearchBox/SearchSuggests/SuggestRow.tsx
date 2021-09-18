import { Link } from 'react-router-dom';

export default function SuggestRow({ row, onClick }: { row: string; onClick: FnType }) {
  const cells = row.replace(/<\/b>/g, '<b>').split('<b>');
  const text = cells.join();
  return (
    <Link
      to={`/search/name/${text}`}
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
