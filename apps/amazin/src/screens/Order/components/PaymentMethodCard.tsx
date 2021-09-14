import InfoCard from './InfoCard';
import StatusBox from '../OrderSumScreen/StatusBox';
import RowLegend from 'src/components/RowLegend';

export default function PaymentMethodCard({ payment, order }: { payment: PaymentMethodType; order?: OrderType }) {
  return (
    <InfoCard label="Payment">
      <RowLegend strong label="Method" children={payment} />
      {order && <StatusBox textOf="Paid" statusOf={order.isPaid} when={order.paidAt} />}
    </InfoCard>
  );
}
