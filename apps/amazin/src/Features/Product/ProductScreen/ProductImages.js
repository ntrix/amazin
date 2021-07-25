import React, { Suspense, useState } from 'react';
import { loadingFallback } from '../../../components/Fallbacks';
import { getImgUrl } from '../../../utils';
import { LazyImg } from '../../../utils/suspenseClient';
export function _ProductScreen({ product }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="col-2 flex mr-1">
      <div className="tab__w6 flex-col">
        {product?.image?.split('^').map((img, id) => (
          <Suspense fallback={loadingFallback}>
            <LazyImg
              key={id}
              alt={`${product.name} small ${id}`}
              src={getImgUrl(product._id, img)}
              onMouseEnter={() => setActiveImg(id)}
              onClick={() => setActiveImg(id)}
              className={`product__thumbnail ${
                id === activeImg ? 'active' : ''
              }`}
            />
          </Suspense>
        ))}
      </div>

      <div className="tab__rest">
        <Suspense fallback={loadingFallback}>
          <LazyImg
            className="large"
            src={getImgUrl(product._id, product?.image?.split('^')[activeImg])}
            alt={`${product.name} ${activeImg}`}
          />
        </Suspense>
      </div>
    </div>
  );
}

const ProductScreen = React.memo(_ProductScreen);
export default ProductScreen;
