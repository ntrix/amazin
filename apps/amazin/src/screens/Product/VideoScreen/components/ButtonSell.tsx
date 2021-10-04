import { memo } from 'react';
import { useHistory } from 'react-router-dom';

import { useProductList } from '../../ProductListScreen/useProductList';

export const SellerButton = (props: { disabled?: boolean; onClick?: FnType } & unknown) => (
  <button className="banner__button mh-2" {...props}>
    Sell This Movie
  </button>
);

function ButtonSell() {
  const history = useHistory();
  const { userInfo, createHandler } = useProductList(history);

  return <SellerButton disabled={!userInfo?.isSeller} onClick={createHandler} />;
}

export default memo(ButtonSell);
