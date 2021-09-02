import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listOrderMine } from 'src/apis/orderAPI';
import LoadingOrError from 'src/components/LoadingOrError';
import OrderTable from './components/OrderTable';
import Header from 'src/layouts/Header';

export default function OrderHistoryScreen() {
  const dispatch = useDispatch();
  const orderMineList = useSelector((state) => state.orderMineList);

  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  return (
    <div>
      <Header p1 label="Order History" />
      <LoadingOrError xl statusOf={orderMineList} />
      <OrderTable orderList={orderMineList} />
    </div>
  );
}
