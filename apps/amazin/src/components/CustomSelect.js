import { MAX_ITEM } from 'src/constants';
import { createId } from 'src/utils';

const Selects = ({ list }) =>
  list.map(({ value, children }) => <option key={value} value={value} children={children || value} />);

export default function CustomSelect({ label, wrapClass = '', optgroup = '', list, max = 1, small = false, ...props }) {
  const _max = Math.min(MAX_ITEM, max);
  const selects = list || [...Array(_max).keys()].map((key) => ({ value: key + 1 }));

  return (
    <>
      {!!label && <label htmlFor={label}>{label}</label>}
      <div className={'select-wrapper ' + wrapClass}>
        <div className={`sprite__caret${small ? '' : ' xl'}`} />
        <select id={createId(optgroup || label)} className="tab__w6" {...props}>
          {optgroup ? <optgroup label={optgroup} children={<Selects list={selects} />} /> : <Selects list={selects} />}
        </select>
      </div>
    </>
  );
}
