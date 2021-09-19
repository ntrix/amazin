export function throttle<T extends unknown[], U>(func: (...args: T) => void | U, wait = 500) {
  let isCalled = false;

  return (...args: T): void | U => {
    if (!isCalled) {
      func(...args);
      isCalled = true;
      setTimeout(function () {
        isCalled = false;
      }, wait);
    }
  };
}
