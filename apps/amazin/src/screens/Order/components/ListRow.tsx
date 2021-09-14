import { pipe } from 'src/utils';

type PropType = {
  label: string;
  toShow: number;
  active?: boolean;
};

export default function ListRow({ label, toShow, active }: PropType) {
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
