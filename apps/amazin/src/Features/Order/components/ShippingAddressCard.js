import React from 'react';

function ShippingAddressCard({ address, children }) {
  return (
    <li className="card card__body">
      <h2>Shipping</h2>

      {!!address && (
        <p>
          <strong>Name:</strong> {address.fullName} <br />
          <strong>Address: </strong> {address.address},{address.city},{' '}
          {address.postalCode},{address.country}
        </p>
      )}
      {children}
    </li>
  );
}

export default ShippingAddressCard;
