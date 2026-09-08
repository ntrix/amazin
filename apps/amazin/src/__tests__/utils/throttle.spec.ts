import { throttle } from '../../utils/throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('calls the function immediately on the first invocation', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled('a');
    expect(fn).toHaveBeenCalledWith('a');
  });

  test('ignores calls made before the wait window elapses', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled('a');
    throttled('b');
    throttled('c');

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('allows another call once the wait window has elapsed', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 500);

    throttled('a');
    jest.advanceTimersByTime(500);
    throttled('b');

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('b');
  });
});
