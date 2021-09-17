import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderDeleteActions } from 'src/slice/OrderSlice';
import { deleteOrder, listOrders } from 'src/apis/orderAPI';
import LoadingOrError from 'src/components/LoadingOrError';
import OrderTable from './components/OrderTable';
import Header from 'src/layouts/Header';
import { useShadow } from 'src/hooks/useShadow';

export default function OrderListScreen({ match }: RouteProps<MatchParams>) {
  const dispatch = useDispatch();
  const { userInfo } = useShadow();
  const sellerMode = match.path.indexOf('/seller') >= 0;
  const orderList: OrderListType = useSelector((state: AppState) => state.orderList);
  const orderDelete: StatusType = useSelector((state: AppState) => state.orderDelete);

  useEffect(() => {
    dispatch(orderDeleteActions._RESET(''));
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, orderDelete.success, userInfo._id]);

  const deleteHandler = (order: OrderType) =>
    window.confirm('Are you sure to delete?') && dispatch(deleteOrder(order._id));

  return (
    <div>
      <Header p1 label="Orders" />
      <LoadingOrError xl statusOf={orderList} />
      <LoadingOrError xl statusOf={orderDelete} />
      <OrderTable orderList={orderList} deleteHandler={deleteHandler} />
    </div>
  );
}
