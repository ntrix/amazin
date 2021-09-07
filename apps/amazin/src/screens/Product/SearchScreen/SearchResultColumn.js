import { lazy, memo } from 'react';

import { SuspenseLoad } from 'src/components/CustomSuspense';
import MessageBox from 'src/components/MessageBox';
import LoadingOrError from 'src/components/LoadingOrError';
const ProductCard = lazy(() => import(/* webpackPrefetch: true */ '../components/ProductCard'));

function SearchResultColumn({list:{ products, loading, error }}) {
  return (
    <div className="row center search__results">
      {(!products || products.length < 2) && <div className="placeholder"></div>}
      <LoadingOrError xl wrapClass="placeholder" statusOf={{loading, error}} />

      {!loading && (
        <>
          <MessageBox wrapClass="placeholder" show={products?.length < 1}>
            No Product Found
          </MessageBox>

          {products?.map((product, id) => (
            <SuspenseLoad key={id} children={<ProductCard product={product} />} />
          ))}
        </>
      )}
      {(!products || products.length < 3) && <div className="placeholder"></div>}
      <div className="row divider-inner"></div>
    </div>
  );
}

export default memo(SearchResultColumn);
