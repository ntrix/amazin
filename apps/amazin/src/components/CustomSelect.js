export default function CustomSelect({ label, list, max = 1, ...props }) {
  const selectList =
    list ||
    Array(max)
      .fill(0)
      .map((_, id) => ({ value: id + 1 }));

  return (
    <>
      {!!label && <label htmlFor={label}>{label}</label>}
      <div className="select-wrapper">
        <div className="sprite__caret xl" />
        <select id={label} className="tab__w6" {...props}>
          {selectList.map(({ value, children }) => (
            <option key={value} value={value} children={children || value} />
          ))}
        </select>
      </div>
    </>
  );
}
