import React from 'react';
import { Link } from 'react-router-dom';

export const _CustomerCard = ({ img, label, line1, line2, to, className }) => (
  <Link to={to} className={`c-box ${className}`}>
    <div className="c-box__inner">
      <div className="c-box__icon-wrapper">
        <img
          className="c-box__icon"
          src={`/images/icon-${img}.png`}
          alt={'icon ' + img}
        ></img>
      </div>

      <div className="c-box__info">
        <h3 className="c-box__label">{label}</h3>

        <ul className="c-box__text">
          <li>{line1}</li>
          <li>{line2}</li>
        </ul>
      </div>
    </div>
  </Link>
);

const CustomerCard = React.memo(_CustomerCard);
export default CustomerCard;

export const mapCustomerCardProp = ([
  img,
  label,
  line1,
  line2,
  to,
  className
]) => ({ img, label, line1, line2, to, className });
