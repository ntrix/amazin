export default function QtySelect({ max, value, onChange }) {
  return (
    <div className="select-wrapper">
      <div className="sprite__caret xl"></div>
      <select className="tab__w6" value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {[...Array(max).keys()].map((x) => (
          <option key={x} value={x + 1} children={x + 1} />
        ))}
      </select>
    </div>
  );
}
