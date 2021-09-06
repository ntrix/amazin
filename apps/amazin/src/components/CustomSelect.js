import { createId } from 'src/utils';

export default function CustomSelect({ label, wrapClass = '', optgroup = '', list, max = 1, small = false, ...props }) {
  const selectList =
    list ||
    Array(max)
      .fill(0)
      .map((_, id) => ({ value: id + 1 }));

  const Selects = () =>
    selectList.map(({ value, children }) => <option key={value} value={value} children={children || value} />);

  return (
    <>
      {!!label && <label htmlFor={label}>{label}</label>}
      <div className={'select-wrapper ' + wrapClass}>
        <div className={`sprite__caret${small ? '' : ' xl'}`} />
        <select id={createId(optgroup || label)} className="tab__w6" {...props}>
          {optgroup ? <optgroup label={optgroup} children={<Selects />} /> : <Selects />}
        </select>
      </div>
    </>
  );
}
