import { debounce } from '../../utils/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not call the callback before the wait time elapses', () => {
    const callback = jest.fn();
    const debounced = debounce(callback, 500);

    debounced('a');
    jest.advanceTimersByTime(499);

    expect(callback).not.toHaveBeenCalled();
  });

  test('calls the callback once, after the wait time, resolving with its return value', async () => {
    const callback = jest.fn().mockReturnValue('result');
    const debounced = debounce(callback, 500);

    const resultPromise = debounced('a');
    jest.advanceTimersByTime(500);
    const result = await resultPromise;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('a');
    expect(result).toBe('result');
  });

  test('collapses rapid successive calls into a single callback call using the latest arguments', async () => {
    const callback = jest.fn().mockReturnValue('result');
    const debounced = debounce(callback, 500);

    debounced('first');
    jest.advanceTimersByTime(200);
    debounced('second');
    jest.advanceTimersByTime(200);
    const resultPromise = debounced('third');
    jest.advanceTimersByTime(500);
    await resultPromise;

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('third');
  });
});
