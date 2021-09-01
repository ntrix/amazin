export default function InfoCard({ label, children }) {
  return (
    <li className="card card__body">
      <h2>{label}</h2>
      {children}
    </li>
  );
}
