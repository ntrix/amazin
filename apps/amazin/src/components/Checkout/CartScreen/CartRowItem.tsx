import { Link } from 'react-router-dom';

import { getImgUrl, pipe } from 'src/utils';
import Button from 'src/components/Button';
import CustomSelect from 'src/components/CustomSelect';

export type CartRowItemProps = {
  item: ItemType;
  addHandler: FnType;
  removeHandler: FnType;
};

function CartRowItem({ item, addHandler, removeHandler }: CartRowItemProps) {
  const { product, name, price, image, qty, countInStock } = item;

  return (
    <tr className="row">
      <td className="tab__w6">
        <Link to={`/product/${product}`}>
          <img src={getImgUrl(product, image.split('^')[0])} alt={name} className="small" />
        </Link>
      </td>
      <td className="tab__rest">
        <Link to={`/product/${product}`}>{name}</Link>
      </td>
      <td className="tab__w9">
        <CustomSelect
          max={countInStock}
          value={qty ?? 1}
          onChange={(e: EventType) => addHandler(product, Number(e.target.value - qty))}
        />
      </td>
      <td className="tab__w6">{pipe.showPrice(price)}</td>
      <td className="tab__w9">
        <Button label="Delete" onClick={() => removeHandler(product)} />
      </td>
    </tr>
  );
}

export default CartRowItem;
