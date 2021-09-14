import StatusBox from '../OrderSumScreen/StatusBox';
import InfoCard from './InfoCard';
import RowLegend from 'src/components/RowLegend';

export default function ShippingAddressCard({ address: adr, order }: { address: AddressType; order: OrderItem }) {
  return (
    <InfoCard label="Shipping">
      {!!adr && (
        <>
          <RowLegend strong label="Name: " children={adr.fullName} />
          <RowLegend strong label="Address: ">
            {adr.address}, {adr.city}, {adr.postalCode}, {adr.country}
          </RowLegend>
        </>
      )}
      {order && <StatusBox textOf="Delivered" statusOf={order.isDelivered} when={order.deliveredAt} />}
    </InfoCard>
  );
}
