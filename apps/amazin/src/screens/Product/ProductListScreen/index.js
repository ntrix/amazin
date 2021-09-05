import { useSelector } from 'react-redux';

import { useProductList } from './useProductList';
import Pagination from 'src/components/Pagination';
import Button from 'src/components/Button';
import LoadingOrError from 'src/components/LoadingOrError';
import Table from './Table';
import Header from 'src/layouts/Header';

export default function ProductListScreen({ history, match }) {
  const { productCreate, productDelete, deleteHandler, createHandler, authUrl } = useProductList(history, match);
  const { products, page, pages, loading, error } = useSelector((state) => state.productList);

  return (
    <div>
      <div className="row p-1">
        <Header title label="Products" />
        <Button primary label="Create Product" onClick={createHandler} />
      </div>

      <LoadingOrError xl statusOf={{ error, loading, ...productDelete, ...productCreate }} />

      {!!products && (
        <Table
          header={['USER_ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND']}
          keys={['_id', 'name', 'price', 'category', 'brand']}
          data={products}
          deleteHandler={deleteHandler}
          to="/product/"
        />
      )}

      {!!products && <Pagination getUrl={authUrl} page={page} pages={pages} help />}
    </div>
  );
}
