export default function InfoCard({ label, children }: { label: string; children?: Children }) {
  return (
    <li className="card card__body">
      <h2>{label}</h2>
      {children}
    </li>
  );
}
