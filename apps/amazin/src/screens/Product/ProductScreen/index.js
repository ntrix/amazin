import { lazy, memo, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { detailsProduct } from 'src/apis/productAPI';
import { KEY } from 'src/constants';
import { Storage } from 'src/utils';
import { loadingFallback } from 'src/components/Fallbacks';
import SellerCard from '../SellerScreen/SellerCard';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import ProductInStock from './ProductInStock';
import LoadingOrError from 'src/components/LoadingOrError';
const ProductImages = lazy(() => import('./ProductImages'));

function ProductScreen({ match }) {
  const dispatch = useDispatch();
  const productId = match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  return (
    <div>
      <LoadingOrError xl statusOf={productDetails} />

      {productDetails?.success && (
        <div className="col-fill">
          <div>
            <div className="row search__banner">
              <Link to={Storage[KEY.HISTORY] || '/'} className="ml-1">
                Back to last section
              </Link>
            </div>
          </div>
          <div className="row top mt-1 p-1">
            <Suspense fallback={loadingFallback}>
              <ProductImages product={product} />
            </Suspense>

            <ProductDescription product={product} />
            <div className="col-1">
              <SellerCard user={product.seller} linkTo={`/seller/${product.seller._id}`} />
              <ProductInStock productId={productId} product={product} />
            </div>
          </div>

          <ProductReview productId={productId} />
        </div>
      )}
    </div>
  );
}
export default memo(ProductScreen);
