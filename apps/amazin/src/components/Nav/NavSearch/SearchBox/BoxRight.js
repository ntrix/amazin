import SearchBtn from './SearchBtn';

export default function BoxRight({ submitHandler }) {
  return (
    <div className="row--right">
      <SearchBtn submitHandler={submitHandler} />
    </div>
  );
}
