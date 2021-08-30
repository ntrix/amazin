import { memo, Suspense, useState } from 'react';
import { loadingFallback } from 'src/components/Fallbacks';
import { LazyImg } from 'src/utils/suspenseClient';
import { getImgUrl } from 'src/utils';

function ProductScreen({ product }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="col-2 flex mr-1">
      <div className="tab__w6 flex-col">
        {product?.image?.split('^').map((img, id) => (
          <Suspense fallback={loadingFallback} key={id}>
            <LazyImg
              alt={`${product.name} small ${id}`}
              src={getImgUrl(product._id, img)}
              onMouseEnter={() => setActiveImg(id)}
              onClick={() => setActiveImg(id)}
              className={`product__thumbnail ${id === activeImg ? 'active' : ''}`}
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
export default memo(ProductScreen);
