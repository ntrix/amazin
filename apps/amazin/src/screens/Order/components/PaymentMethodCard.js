import InfoCard from './InfoCard';
import StatusBox from '../OrderSumScreen/StatusBox';

export default function PaymentMethodCard({ payment, order }) {
  return (
    <InfoCard label="Payment">
      <p>
        <strong>Method:</strong> {payment}
      </p>
      {order && <StatusBox textOf="Paid" statusOf={payment.isPaid} when={payment.paidAt} />}
    </InfoCard>
  );
}
