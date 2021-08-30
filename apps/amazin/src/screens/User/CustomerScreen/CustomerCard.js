import { memo } from 'react';
import { useHistory } from 'react-router';

function CustomerCard({ img, label, line1, line2, to, className, baseUrl = '' }) {
  const history = useHistory();
  return (
    <div className={`c-box ${className}`} onClick={() => history.push(to)}>
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

export const mapCustomerCardProp = ([img, label, line1, line2, to, className = ''], key) => ({
  img,
  label,
  line1,
  line2,
  to,
  className,
  key
});

export default memo(CustomerCard);
