import InfoCard from './InfoCard';
import StatusBox from '../OrderSumScreen/StatusBox';
import RowLegend from 'src/components/RowLegend';

export default function PaymentMethodCard({ payment, order }) {
  return (
    <InfoCard label="Payment">
      <RowLegend strong label="Method" children={payment} />
      {order && <StatusBox textOf="Paid" statusOf={payment.isPaid} when={payment.paidAt} />}
    </InfoCard>
  );
}
