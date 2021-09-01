import Button from 'src/components/Button';
import CheckCell from 'src/components/CheckCell';
import BaseTable from 'src/layouts/BaseTable';

export default function Table({ header, keys, data, deleteHandler, createBtn }) {
  return (
    <BaseTable
      header={header.map((h) => h.toUpperCase())}
      body={data.map((row) => (
        <tr key={row._id}>
          {keys.map((col) => (
            <CheckCell children={row[col]} />
          ))}

          <td>
            {!!deleteHandler && <Button xs className="danger" label="Del." onClick={() => deleteHandler(row)} />}
            {createBtn(row)}
          </td>
        </tr>
      ))}
    />
  );
}
