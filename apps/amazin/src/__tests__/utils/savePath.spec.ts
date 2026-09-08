import { savePath } from '../../utils/savePath';
import { Storage } from '../../utils';
import { KEY } from '../../constants';

describe('savePath', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
    Storage[KEY.HISTORY] = '';
  });

  test('saves the current pathname to Storage by default', () => {
    window.history.pushState({}, '', '/product/42');
    savePath()();
    expect(Storage[KEY.HISTORY]).toBe('/product/42');
  });

  // NOTE: the default prefix is '@', but window.location.pathname always starts with '/',
  // so `'@'` can never actually match a real pathname — the default exception is effectively
  // dead code. Both real call sites using the default (ProductCard.tsx, IconButton.tsx) always
  // save, regardless of the current path. This test documents that actual behavior.
  test('with the default prefix, saves the path even for routes that look like they should be excluded', () => {
    window.history.pushState({}, '', '/@admin/orders');
    savePath()();
    expect(Storage[KEY.HISTORY]).toBe('/@admin/orders');
  });

  test('accepts a custom exception prefix', () => {
    window.history.pushState({}, '', '/checkout/cart');
    savePath('/checkout')();
    expect(Storage[KEY.HISTORY]).toBe('');
  });
});
