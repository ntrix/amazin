import { pipe } from '../../utils/currencyPipe';

describe('pipe', () => {
  const originalRates = { ...pipe.rates };

  afterEach(() => {
    pipe.setCurrency('EUR');
    Object.assign(pipe.rates, originalRates);
  });

  test('setCurrency changes the currency used by default in the other getters', () => {
    pipe.setCurrency('USD');
    expect(pipe.getSymbol()).toBe('$');
    expect(pipe.getName()).toBe('US Dollar');
  });

  test('getRate falls back to 1 for an unknown currency', () => {
    expect(pipe.getRate('XYZ' as never)).toBe(1);
  });

  test('updateRates only applies when the incoming rates include EUR', () => {
    pipe.updateRates({ USD: 999 } as never);
    expect(pipe.rates.USD).toBe(originalRates.USD);

    pipe.updateRates({ EUR: 1, USD: 1.5 } as never);
    expect(pipe.rates.USD).toBe(1.5);
  });

  test('getPrice converts using the given rate and formats to the configured decimals', () => {
    expect(pipe.getPrice(10, 1.2)).toBe('12.00');
  });

  test('getCent returns only the decimal part of the formatted price', () => {
    expect(pipe.getCent(10.256, 1)).toBe('26');
  });

  test('showPrice combines the symbol and the formatted price for the current currency', () => {
    pipe.setCurrency('USD');
    expect(pipe.showPrice(10)).toBe(`$ ${(10 * pipe.rates.USD).toFixed(2)}`);
  });
});
