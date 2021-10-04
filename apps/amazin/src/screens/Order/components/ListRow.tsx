import { pipe } from 'src/utils';

export type ListRowProps = {
  label: string;
  toShow: number;
  active?: boolean;
};

export default function ListRow({ label, toShow, active }: ListRowProps) {
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
