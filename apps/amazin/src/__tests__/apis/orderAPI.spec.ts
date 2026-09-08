jest.mock('../../apis/axiosClient');

import { axiosPrivate } from '../../apis/axiosClient';
import {
  createOrder,
  detailsOrder,
  payOrder,
  listOrderMine,
  listOrders,
  deleteOrder,
  deliverOrder
} from '../../apis/orderAPI';
import { cartActions } from '../../slice/CartSlice';
import {
  orderCreateActions,
  orderDetailsActions,
  orderPayActions,
  orderMineListActions,
  orderListActions,
  orderDeleteActions,
  orderDeliverActions
} from '../../slice/OrderSlice';

const mockedAxiosPrivate = axiosPrivate as jest.MockedFunction<typeof axiosPrivate>;

describe('orderAPI', () => {
  let mockInnerCall: jest.Mock;

  beforeEach(() => {
    mockInnerCall = jest.fn(() => Promise.resolve());
    mockedAxiosPrivate.mockReturnValue(mockInnerCall as never);
  });

  test('createOrder posts the order and clears the cart on success', () => {
    createOrder({ _id: 'o1' } as never);

    expect(mockedAxiosPrivate).toHaveBeenCalledWith(
      [orderCreateActions],
      expect.objectContaining({ successAction: cartActions._EMPTY, selector: expect.any(Function) })
    );
    expect(mockInnerCall).toHaveBeenCalledWith('post', '/api/orders', { _id: 'o1' });
  });

  test('detailsOrder fetches a single order', () => {
    detailsOrder('o1');
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderDetailsActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/orders/o1');
  });

  test('payOrder puts the payment result to the order', () => {
    payOrder({ _id: 'o1' } as never, { id: 'pay1' } as never);
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderPayActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('put', '/api/orders/o1/pay', { id: 'pay1' });
  });

  test('listOrderMine fetches the signed-in user own orders', () => {
    listOrderMine();
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderMineListActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/orders/mine');
  });

  test('listOrders filters by seller when one is given', () => {
    listOrders({ seller: 's1' });
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderListActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('get', '/api/orders?seller=s1');
  });

  test('deleteOrder deletes the given order', () => {
    deleteOrder('o1');
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderDeleteActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('delete', '/api/orders/o1');
  });

  test('deliverOrder marks the given order as delivered', () => {
    deliverOrder('o1');
    expect(mockedAxiosPrivate).toHaveBeenCalledWith([orderDeliverActions]);
    expect(mockInnerCall).toHaveBeenCalledWith('put', '/api/orders/o1/deliver');
  });
});
