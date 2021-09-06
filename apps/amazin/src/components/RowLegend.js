export default function RowLegend({ label, className = '', strong = false, children }) {
  return (
    <div className={'row ' + className}>
      {strong ? (
        <p>
          <b>{label}</b>
        </p>
      ) : (
        <p>{label}</p>
      )}
      {children}
    </div>
  );
}
