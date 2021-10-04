import { useSelector } from 'react-redux';

import { useProductList } from './useProductList';
import Pagination from 'src/components/Pagination';
import Button from 'src/components/Button';
import LoadingOrError from 'src/components/LoadingOrError';
import Table from 'src/components/Product/ProductListScreen/Table';
import Header from 'src/layouts/Header';

export default function ProductListScreen({ history, match }: RouteProps<MatchParams>) {
  const { productCreate, productDelete, deleteHandler, createHandler, authPage } = useProductList(history, match);
  const { products, page, pages, loading, error }: ProductListType = useSelector(
    (state: AppState) => state.productList
  );

  return (
    <div>
      <div className="row p-1">
        <Header title label="Products" />
        <Button primary label="Create Product" onClick={createHandler} />
      </div>

      <LoadingOrError xl statusOf={{ loading, error, ...productDelete, ...productCreate }} />

      {!!products && (
        <Table
          header={['PRODUCT_ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND']}
          keys={['_id', 'name', 'price', 'category', 'brand']}
          tabRows={products}
          deleteHandler={deleteHandler}
          to="/product/"
        />
      )}

      {!!products && <Pagination getUrl={authPage} page={page} pages={pages} help />}
    </div>
  );
}
