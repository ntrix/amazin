import { pipe } from 'src/utils';

export default function PriceTag({ price, deal }) {
  return (
    <div>
      <span className={`price ${deal ? 'danger' : ''}`}>
        <sup>{pipe.getSymbol()}</sup>
        {pipe.getNote(price)}
        <sup>{pipe.getCent(price)}</sup>
      </span>
      {deal > 0 && (
        <span className="pull-right">
          <b className="price strike">
            <sup>{pipe.getSymbol()}</sup>
            {pipe.getPrice(price / (1 - deal / 100))}
          </b>
          {`  (${deal}% off)`}
        </span>
      )}
    </div>
  );
}
