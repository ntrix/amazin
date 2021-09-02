import { memo, useState } from 'react';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import { LazyImg } from 'src/apis/suspenseAPI';
import { getImgUrl } from 'src/utils';

function ProductImages({ product }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="col-2 flex mr-1">
      <div className="tab__w6 flex-col">
        {product?.image?.split('^').map((img, id) => (
          <SuspenseLoad key={id}>
            <LazyImg
              alt={`${product.name} small ${id}`}
              src={getImgUrl(product._id, img)}
              onMouseEnter={() => setActiveImg(id)}
              onClick={() => setActiveImg(id)}
              className={`product__thumbnail ${id === activeImg ? 'active' : ''}`}
            />
          </SuspenseLoad>
        ))}
      </div>

      <div className="tab__rest">
        <SuspenseLoad>
          <LazyImg
            className="large"
            src={getImgUrl(product._id, product?.image?.split('^')[activeImg])}
            alt={`${product.name} ${activeImg}`}
          />
        </SuspenseLoad>
      </div>
    </div>
  );
}

export default memo(ProductImages);
