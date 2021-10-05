import { lazy, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './productScreen.css';
import { useProductReview } from './useProductReview';
import { detailsProduct } from 'src/apis/productAPI';
import { SuspenseLoad } from 'src/components/CustomSuspense';
import LoadingOrError from 'src/components/LoadingOrError';
import BackBanner from 'src/components/Product/BackBanner';
import SellerCard from '../SellerScreen/SellerCard';
import ProductInStock from 'src/components/Product/ProductScreen/ProductInStock';
import ProductDescription from 'src/components/Product/ProductScreen/ProductDescription';
import ProductReview from 'src/components/Product/ProductScreen/ProductReview';
const ProductImages: Lazy = lazy((): LazyPromise => import('src/components/Product/ProductScreen/ProductImages'));

function ProductScreen({ match: { params } }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const productDetail: ProductDetailType = useSelector((state: AppState) => state.productDetails);
  const { product, success } = productDetail;
  const reviewProps = useProductReview(params.id);

  useEffect(() => {
    dispatch(detailsProduct(params.id));
  }, [params.id, dispatch]);

  if (!success) return <LoadingOrError xl statusOf={productDetail} />;
  return (
    <div className="col-fill">
      <BackBanner />
      <div className="row top mt-1 p-1">
        <SuspenseLoad children={<ProductImages product={product} />} />
        <ProductDescription product={product} />

        <div className="col-1">
          {!!product?.seller.seller && (
            <SellerCard seller={product.seller.seller} to={`/seller/${product.seller._id}`} />
          )}
          <ProductInStock productId={params.id} product={product} />
        </div>
      </div>

      <ProductReview product={product} {...reviewProps} />
    </div>
  );
}
export default memo(ProductScreen);
