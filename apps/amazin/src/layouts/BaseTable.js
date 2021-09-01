export default function BaseTable({ header, body }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {header.map((head) => (
            <th key={head}>{head.toUpperCase()}</th>
          ))}

          <th className="tab__w12">ACTIONS</th>
        </tr>
      </thead>

      <tbody>{body}</tbody>
    </table>
  );
}
