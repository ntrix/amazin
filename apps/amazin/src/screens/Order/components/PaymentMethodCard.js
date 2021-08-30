export default function PaymentMethodCard({ payment, children }) {
  return (
    <li className="card card__body">
      <h2>Payment</h2>
      <p>
        <strong>Method:</strong> {payment}
      </p>
      {children}
    </li>
  );
}
