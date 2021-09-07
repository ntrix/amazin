import { lazy, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsProduct } from 'src/apis/productAPI';
import { SuspenseLoad } from 'src/components/CustomSuspense';
import SellerCard from '../SellerScreen/SellerCard';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import ProductInStock from './ProductInStock';
import LoadingOrError from 'src/components/LoadingOrError';
import BackBanner from './BackBanner';
const ProductImages = lazy(() => import('./ProductImages'));

function ProductScreen({ match: { params } }) {
  const dispatch = useDispatch();
  const { product, success, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(detailsProduct(params.id));
  }, [params.id, dispatch]);

  if (!success) return <LoadingOrError xl statusOf={{ loading, error }} />;

  return (
    <div className="col-fill">
      <BackBanner />
      <div className="row top mt-1 p-1">
        <SuspenseLoad children={<ProductImages product={product} />} />
        <ProductDescription product={product} />

        <div className="col-1">
          <SellerCard user={product.seller} to={`/seller/${product.seller._id}`} />
          <ProductInStock productId={params.id} product={product} />
        </div>
      </div>

      <ProductReview productId={params.id} reviews={product.reviews} />
    </div>
  );
}
export default memo(ProductScreen);
