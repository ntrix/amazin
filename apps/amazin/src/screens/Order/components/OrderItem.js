import { Link } from 'react-router-dom';
import { getImgUrl, pipe } from 'src/utils';

export default function OrderItem({ item }) {
  return (
    <li>
      <div className="row">
        <div>
          <img src={getImgUrl(item.product, item.image.split('^')[0])} alt={item.name} className="small" />
        </div>
        <div className="min-20">
          <Link to={`/product/${item.product}`}>{item.name}</Link>
        </div>
        <div>
          {item.qty} x {pipe.showPrice(item.price)} ={' ' + pipe.showPrice(item.qty * item.price)}
        </div>
      </div>
    </li>
  );
}
