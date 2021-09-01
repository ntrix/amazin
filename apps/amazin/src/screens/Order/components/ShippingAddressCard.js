import StatusBox from '../OrderSumScreen/StatusBox';
import InfoCard from './InfoCard';

export default function ShippingAddressCard({ address: adr, order }) {
  return (
    <InfoCard label="Shipping">
      {!!adr && (
        <p>
          <strong>Name:</strong> {adr.fullName} <br />
          <strong>Address: </strong> {adr.address}, {adr.city}, {adr.postalCode}, {adr.country}
        </p>
      )}
      {order && <StatusBox textOf="Delivered" statusOf={order.isDelivered} when={order.deliveredAt} />}
    </InfoCard>
  );
}
