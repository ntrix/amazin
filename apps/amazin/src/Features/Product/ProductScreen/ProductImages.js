import React, { useState } from 'react';
import { getImgUrl } from '../../../utils';

export function _ProductScreen({ product }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="col-2 flex mr-1">
      <div className="tab__w6 flex-col">
        {product?.image?.split('^').map((img, id) => (
          <img
            key={id}
            src={getImgUrl(product._id, img)}
            alt={`${product.name} small ${id}`}
            onMouseEnter={() => setActiveImg(id)}
            onClick={() => setActiveImg(id)}
            className={`product__thumbnail ${id === activeImg ? 'active' : ''}`}
          ></img>
        ))}
      </div>

      <div className="tab__rest">
        <img
          className="large"
          src={getImgUrl(product._id, product?.image?.split('^')[activeImg])}
          alt={`${product.name} ${activeImg}`}
        ></img>
      </div>
    </div>
  );
}

const ProductScreen = React.memo(_ProductScreen);
export default ProductScreen;
