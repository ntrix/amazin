export default function LanguageOption({
  label,
  short,
  text,
  className
}: Partial<Record<'label' | 'short' | 'text' | 'className', string>>) {
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
