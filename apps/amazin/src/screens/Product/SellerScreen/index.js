import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { listProducts } from 'src/apis/productAPI';
import { publicDetailsSeller } from 'src/apis/userAPI';
import { SORT } from 'src/constants';
import { SusProductCard, SusProductList } from '../components/ProductCard';
import SellerCard from './SellerCard';
import Pagination from 'src/components/Pagination';
import SortFilter from 'src/components/SortFilter';
import MessageBox from 'src/components/MessageBox';
import SearchBanner from 'src/components/Nav/SearchBanner';
import LoadingOrError from 'src/components/LoadingOrError';

function SellerScreen({ match }) {
  const dispatch = useDispatch();
  const { pageNumber = 1, order: pOrder = SORT.BESTSELLING.OPT } = useParams();
  const sellerId = match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  const getUrl = ({ order = pOrder, page: _page = pageNumber }) =>
    `/seller/${sellerId}/order/${order}/pageNumber/${_page}`;

  useEffect(() => {
    dispatch(publicDetailsSeller(sellerId));
    dispatch(listProducts({ seller: sellerId, order: pOrder, pageNumber }));
  }, [dispatch, sellerId, pOrder, pageNumber]);

  return (
    <div className="row top">
      <SearchBanner list={productList} />

      <div className="col-1 p-1">
        <LoadingOrError statusOf={userDetails} />
        {!!user && <SellerCard user={user} size="medium" mail info />}
        <div className="card card__body m-0">
          <br />
          <SortFilter order={pOrder} getUrl={getUrl} />
        </div>
      </div>

      <div className="col-3 mt-1 p-1">
        <LoadingOrError xl statusOf={productList} />

        <Pagination getUrl={getUrl} page={page} pages={pages} />

        <MessageBox show={products?.length < 1}>No Product Found</MessageBox>
        <div className="row center">
          <SusProductList>
            {products?.map((product) => (
              <SusProductCard key={product._id} product={product} />
            ))}
          </SusProductList>
        </div>

        <Pagination getUrl={getUrl} page={page} pages={pages} help />
      </div>
    </div>
  );
}

export default memo(SellerScreen);
