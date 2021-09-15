import Header from 'src/layouts/Header';

function CustomerHelpSection() {
  return (
    <section className="help-section col-fill">
      <label htmlFor="search-faq">
        <h3>
          Search the help library
          <i> Type something like, "question about a charge"</i>
        </h3>
      </label>

      <input type="text" id="search-faq"></input>

      <Header label="Browse Help Topics " />
      <h2>In construction</h2>
      <p>Help Section:</p>
    </section>
  );
}

export default CustomerHelpSection;
