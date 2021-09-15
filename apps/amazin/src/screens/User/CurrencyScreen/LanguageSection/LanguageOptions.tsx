import { languageTemplate } from './languageTemplate';
import LanguageOption from './LanguageOption';

export default function LanguageOptions() {
  return (
    <>
      <li className="separator" />
      {languageTemplate.map(([label, short, text], id) => (
        <LanguageOption key={id} label={label} short={short} text={text} className="disabled" />
      ))}
    </>
  );
}
