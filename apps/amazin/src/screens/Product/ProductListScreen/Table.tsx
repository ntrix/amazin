import Button from 'src/components/Button';
import CheckCell from 'src/components/CheckCell';
import BaseTable from 'src/layouts/BaseTable';

type PropType = {
  header: string[];
  keys: string[];
  products: ProductType[];
  deleteHandler?: FnType;
  to?: string;
};

export default function Table({ header, keys, products, deleteHandler, to }: PropType) {
  return (
    <BaseTable
      header={header.map((h) => h.toUpperCase())}
      body={products?.map((row) => (
        <tr key={row._id}>
          {keys.map((col, id) => (
            <CheckCell key={`${row._id} ${id}`} children={row[col]} />
          ))}

          <td>
            {!!deleteHandler && <Button xs className="danger" label="Del." onClick={() => deleteHandler(row)} />}
            {!!to && <Button xs label="Edit" to={`${to}${row._id}/edit`} />}
          </td>
        </tr>
      ))}
    />
  );
}
