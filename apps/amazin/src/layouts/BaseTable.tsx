export type BaseTableProps = { header: string[]; body: Children };

export default function BaseTable({ header: labels, body }: BaseTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          {labels.map((label) => (
            <th key={label}>{label.toUpperCase()}</th>
          ))}

          <th className="tab__w12">ACTIONS</th>
        </tr>
      </thead>

      <tbody>{body}</tbody>
    </table>
  );
}
