export default function CheckCell({ check }) {
  return <td className="text-center success">{!!check && <i className="fa fa-check" aria-hidden="true" />}</td>;
}
