import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listOrderMine } from 'src/apis/orderAPI';
import LoadingOrError from 'src/components/LoadingOrError';
import OrderTable from './components/OrderTable';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const orderMineList = useSelector((state) => state.orderMineList);

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <h1 className="p-1">Order History</h1>
      <LoadingOrError xl statusOf={orderMineList} />
      <OrderTable orderList={orderMineList} />
    </div>
  );
}
