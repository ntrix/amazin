import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { listProducts } from 'src/apis/productAPI';
import { publicDetailsSeller } from 'src/apis/userAPI';
import { SORT } from 'src/constants';
import SellerCard from './SellerCard';
import Pagination from 'src/components/Pagination';
import SortFilter from 'src/components/SortFilter';
import SearchBanner from 'src/components/Nav/SearchBanner';
import LoadingOrError from 'src/components/LoadingOrError';
import ProductColumn from '../components/ProductColumn';

function SellerScreen({ match: { params } }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const { pageNumber = '1', order: pOrder = SORT.BESTSELLING.OPT }: Record<string, string> = useParams();
  const userDetails: UserDetailType = useSelector((state: AppState) => state.userDetails);
  const { user } = userDetails;
  const productList: ProductListType = useSelector((state: AppState) => state.productList);
  const { page, pages } = productList;

  const getUrl = ({ order = pOrder as string, page: _page = pageNumber as string }) =>
    `/seller/${params.id}/order/${order}/pageNumber/${_page}`;

  useEffect(() => {
    dispatch(publicDetailsSeller(params.id));
    dispatch(listProducts({ seller: params.id, order: pOrder, pageNumber }));
  }, [dispatch, params.id, pOrder, pageNumber]);

  return (
    <div className="row top">
      <SearchBanner list={productList} />

      <div className="col-1 p-1">
        <LoadingOrError statusOf={userDetails} />
        {!!user?.seller && <SellerCard seller={user.seller} size="medium" mail info />}
        <div className="card card__body m-0">
          <br />
          <SortFilter order={pOrder} getUrl={getUrl} />
        </div>
      </div>

      <div className="col-3 mt-1 p-1">
        <Pagination getUrl={getUrl} page={page} pages={pages} />
        <ProductColumn productList={productList} />
        <Pagination getUrl={getUrl} page={page} pages={pages} help />
      </div>
    </div>
  );
}

export default memo(SellerScreen);
