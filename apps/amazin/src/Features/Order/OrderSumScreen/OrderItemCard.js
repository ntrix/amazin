import { Link } from 'react-router-dom';

import { getImgUrl, pipe } from '../../../utils';

function OrderItemCard({ items }) {
  return (
    <li className="card card__body">
      <div className="p-1">
        <h2>Order Items</h2>

        <ul>
          {items?.map((item, id) => (
            <li key={id}>
              <div className="row">
                <div>
                  <img
                    src={getImgUrl(item.product, item.image.split('^')[0])}
                    alt={item.name}
                    className="small"
                  />
                </div>

                <div className="min-20">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>

                <div>
                  {item.qty} x {pipe.showPrice(item.price)} =
                  {' ' + pipe.showPrice(item.qty * item.price)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default OrderItemCard;
