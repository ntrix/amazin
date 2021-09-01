import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderDeleteActions } from 'src/slice/OrderSlice';
import { deleteOrder, listOrders } from 'src/apis/orderAPI';
import LoadingOrError from 'src/components/LoadingOrError';
import OrderTable from './components/OrderTable';

export default function OrderListScreen({ match }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const sellerMode = match.path.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const orderDelete = useSelector((state) => state.orderDelete);

  useEffect(() => {
    dispatch(orderDeleteActions._RESET());
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, orderDelete.success, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <h1 className="p-1">Orders</h1>
      <LoadingOrError xl statusOf={orderList} />
      <LoadingOrError xl statusOf={orderDelete} />
      <OrderTable orderList={orderList} deleteHandler={deleteHandler} />
    </div>
  );
}
