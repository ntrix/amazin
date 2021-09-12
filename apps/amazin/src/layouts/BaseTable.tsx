type PropType = { header: string[]; body: any };

export default function BaseTable({ header: labels, body }: PropType) {
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
