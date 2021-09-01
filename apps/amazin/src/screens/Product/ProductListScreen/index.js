import { useSelector } from 'react-redux';

import { useProductList } from './useProductList';
import Pagination from 'src/components/Pagination';
import Button from 'src/components/Button';
import LoadingOrError from 'src/components/LoadingOrError';
import Table from './Table';

export default function ProductListScreen({ match, history }) {
  const { productCreate, productDelete, deleteHandler, createHandler, authUrl } = useProductList(match, history);
  const { products, page, pages, loading, error } = useSelector((state) => state.productList);

  return (
    <div>
      <div className="row p-1">
        <h1>Products</h1>
        <Button primary label="Create Product" onClick={createHandler} />
      </div>

      <LoadingOrError xl statusOf={{ error, loading, ...productDelete, ...productCreate }} />

      {!!products && (
        <Table
          header={['USER_ID', 'NAME', 'PRICE', 'CATEGORY', 'BRAND']}
          keys={['_id', 'name', 'price', 'category', 'brand']}
          data={products}
          deleteHandler={deleteHandler}
          createBtn={(product) => <Button xs label="Edit" to={`/product/${product._id}/edit`} />}
        />
      )}

      {!!products && <Pagination getUrl={authUrl} page={page} pages={pages} help />}
    </div>
  );
}
