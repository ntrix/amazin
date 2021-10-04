import { pipe } from 'src/utils';

export type PriceNowProps = {
  price: number;
  deal?: number;
};

export default function PriceNow({ price, deal = 0 }: PriceNowProps) {
  return (
    <span className={`price ${deal ? 'danger' : ''}`}>
      <sup>{pipe.getSymbol()}</sup>
      {pipe.getNote(price)}
      <sup>{pipe.getCent(price)}</sup>
    </span>
  );
}
