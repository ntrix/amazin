import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { listProducts } from '../../../Controllers/productActions';
import { publicDetailsSeller } from '../../../Controllers/userActions';
import SellerCard from './SellerCard';

import Pagination from '../../../components/Pagination';
import SortFilter from '../../../components/SortFilter';
import MessageBox from '../../../components/MessageBox';
import LoadingOrError from '../../../components/LoadingOrError';
import { SORT } from '../../../constants';
import { loadingFallback } from '../../../components/Fallbacks';
import SearchBanner from '../../Nav/SearchBanner';

const ProductCard = React.lazy(() =>
  import(/* webpackPrefetch: true */ '../components/ProductCard')
);

export function _SellerScreen({ match }) {
  const dispatch = useDispatch();
  const { pageNumber = 1, order: pOrder = SORT.BESTSELLING.OPT } = useParams();
  const sellerId = match.params.id;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const getUrl = ({ order = pOrder, page: _page = pageNumber }) =>
    `/seller/${sellerId}/order/${order}/pageNumber/${_page}`;

  useEffect(() => {
    dispatch(publicDetailsSeller(sellerId));
    dispatch(listProducts({ seller: sellerId, order: pOrder, pageNumber }));
  }, [dispatch, sellerId, pOrder, pageNumber]);

  return (
    <div className="row top">
      <SearchBanner />

      <div className="col-1 p-1">
        <LoadingOrError statusOf={userDetails} />

        {!!user && <SellerCard user={user} size="medium" mailTo info />}

        <div className="card card__body m-0">
          <br />
          <SortFilter order={pOrder} getUrl={getUrl} />
        </div>
      </div>

      <div className="col-3 mt-1 p-1">
        <LoadingOrError xl statusOf={productList} />

        <Pagination getUrl={getUrl} />

        <MessageBox show={products?.length < 1}>No Product Found</MessageBox>

        <div className="row center">
          {products?.map((product) => (
            <Suspense fallback={loadingFallback} key={product._id}>
              <ProductCard product={product} />
            </Suspense>
          ))}
        </div>

        <Pagination getUrl={getUrl} help />
      </div>
    </div>
  );
}

const SellerScreen = React.memo(_SellerScreen);
export default SellerScreen;
