import { pipe } from 'src/utils';
import PriceNow, { PriceNowProps } from './PriceNow';

export default function PriceTag({ price, deal = 0 }: PriceNowProps) {
  return (
    <div>
      <PriceNow price={price} deal={deal} />
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
