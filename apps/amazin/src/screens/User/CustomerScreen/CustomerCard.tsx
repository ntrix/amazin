import { memo } from 'react';
import { useHistory } from 'react-router';

export type CustomerCardProps = {
  img?: string;
  label?: string;
  line1?: string;
  line2?: string;
  to?: string;
  className?: string;
  baseUrl?: string;
};

function CustomerCard({ img, label, line1, line2, to, className, baseUrl = '' }: CustomerCardProps) {
  const history = useHistory();

  return (
    <div className={`c-box ${className}`} onClick={to ? () => history.push(to) : undefined}>
      <div className="c-box__inner">
        <div className="c-box__icon-wrapper">
          <img className="c-box__icon" src={`${baseUrl}/images/icon-${img}.png`} alt={'icon ' + img}></img>
        </div>
        <div className="c-box__info">
          <h3 className="c-box__label">{label}</h3>
          <ul className="c-box__text">
            <li>{line1}</li>
            <li>{line2}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export const mapCustomerCardProp = ([img, label, line1, line2, to, className = '']: (string | undefined)[]) => ({
  img,
  label,
  line1,
  line2,
  to,
  className
});

export default memo(CustomerCard);
