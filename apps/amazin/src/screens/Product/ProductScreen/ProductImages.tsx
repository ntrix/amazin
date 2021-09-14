import { memo, useState } from 'react';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import { LazyImg } from 'src/apis/suspenseAPI';
import { getImgUrl } from 'src/utils';

function ProductImages({ product: { image, _id } }: { product: ProductType }) {
  const [active, setActive] = useState(0);
  const urls = (image ?? '').split('^').map((img) => getImgUrl(_id, img));

  return (
    <div className="col-2 flex mr-1">
      <div className="tab__w6 flex-col">
        {urls.map((url, id) => (
          <SuspenseLoad key={id}>
            <LazyImg
              alt={`thumbnail ${id}`}
              src={url}
              onMouseEnter={() => setActive(id)}
              onClick={() => setActive(id)}
              className={`product__thumbnail ${id === active ? 'active' : ''}`}
            />
          </SuspenseLoad>
        ))}
      </div>

      <div className="tab__rest">
        <SuspenseLoad children={<LazyImg className="large" src={urls[active]} alt={String(active)} />} />
      </div>
    </div>
  );
}

export default memo(ProductImages);
