export default function LanguageOption({ label, short, text, className }) {
  return (
    <li className={'language ' + className}>
      <div className="sprite__wrapper">
        <div className="sprite circle"></div>
        <span>
          {label} - {short} - <i>{text}</i>
        </span>
      </div>
    </li>
  );
}
