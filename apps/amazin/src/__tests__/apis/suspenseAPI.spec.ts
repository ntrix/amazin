import { createSuspenseAPI, subscribeResource } from '../../apis/suspenseAPI';

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('createSuspenseAPI', () => {
  test('throws the pending promise while still loading', () => {
    const resource = createSuspenseAPI(new Promise(() => undefined));
    expect(() => resource.read()).toThrow();
  });

  test('returns the resolved value once the promise settles', async () => {
    const resource = createSuspenseAPI(Promise.resolve('done'));
    await flush();
    expect(resource.read()).toBe('done');
  });

  test('throws the rejection reason once the promise rejects', async () => {
    const resource = createSuspenseAPI(Promise.reject('failed'));
    await flush();
    expect(() => resource.read()).toThrow('failed');
  });
});

describe('subscribeResource', () => {
  test('throws a promise while the slice is loading', () => {
    const resource = subscribeResource({ loading: true } as never);
    expect(() => resource.read('userInfo' as never)).toThrow();
  });

  test('throws the error when the slice has one', () => {
    const resource = subscribeResource({ loading: false, error: 'boom' } as never);
    expect(() => resource.read('userInfo' as never)).toThrow('boom');
  });

  test('returns the requested state slice when present', () => {
    const resource = subscribeResource({ loading: false, userInfo: { name: 'Ada' } } as never);
    expect(resource.read('userInfo' as never)).toEqual({ name: 'Ada' });
  });

  test('falls back to the prop key itself when the slice value is falsy', () => {
    const resource = subscribeResource({ loading: false } as never);
    expect(resource.read('userInfo' as never)).toBe('userInfo');
  });
});
