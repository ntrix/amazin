import { languageTemplate } from './languageTemplate';
import LanguageOption from './LanguageOption';

export default function LanguageOptions() {
  return (
    <>
      <li className="separator" />
      {languageTemplate.map(([label, short, text]) => (
        <LanguageOption key={label} label={label} short={short} text={text} className="disabled" />
      ))}
    </>
  );
}
