import LanguageOption from './LanguageOption';
import LanguageOptions from './LanguageOptions';

export default function LanguageSection() {
  return (
    <header className="container flex">
      <div className="col-50p">
        <h2 className="title">Language Settings</h2>
        <p className="sub-title">Select the language you prefer for browsing, shopping, and communications.</p>

        <div className="languages">
          <ul className="max-30">
            <LanguageOption className="active" label="English" short="EN" text="Translation" />

            <LanguageOptions />
          </ul>
          <br />
        </div>
      </div>

      <div className="col-50p">
        <b>Translation</b>
        <p className="disabled">
          We'll translate the most important information for your browsing, shopping, and communications.
        </p>
      </div>
    </header>
  );
}
