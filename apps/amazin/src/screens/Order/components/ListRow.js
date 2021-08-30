import { pipe } from 'src/utils';

export default function ListRow({ label, toShow, active }) {
  if (!toShow && toShow !== 0) return null;
  return (
    <li>
      <div className={`row ${active ? 'active' : ''}`}>
        <div>{label}</div>
        <div>{pipe.showPrice(toShow)}</div>
      </div>
    </li>
  );
}
