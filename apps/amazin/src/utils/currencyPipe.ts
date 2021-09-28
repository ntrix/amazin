import { CURR_FORMAT } from 'src/constants';

/* util for currency and all its pipes, rates, calculations, can use intl instead */
const rates: CurrRateType = {
  //default dummy rate
  EUR: 1,
  USD: 1.2,
  GBP: 0.9,
  CZK: 27,
  PLN: 5,
  CHF: 1.1
};
const longName: CurrNameType = {
  GBP: 'GB Pounds',
  USD: 'US Dollar',
  PLN: 'Polish Zloty',
  CZK: 'Czech Koruna',
  CHF: 'Swiss France',
  EUR: 'Euro (Default)'
};
const symbol: CurrNameType = {
  GBP: '£',
  USD: '$',
  PLN: 'zł',
  CZK: 'Kč',
  CHF: 'CHf',
  EUR: '€'
};

type pipeType = {
  rates: CurrRateType;
  longName: CurrNameType;
  symbol: CurrNameType;
  currency: CurrType;
  currencies: CurrType[];
  setCurrency: FnType;
  updateRates: FnType;
  getSymbol: FnType;
  getName: FnType;
  getRate: FnType;
  getPrice: FnType;
  getNote: FnType;
  getCent: FnType;
  showPrice: FnType;
};

export const pipe: pipeType = {
  rates,
  longName,
  symbol,
  currency: 'EUR',
  currencies: ['EUR', 'GBP', 'USD', 'PLN', 'CZK', 'CHF'],
  setCurrency(currency) {
    pipe.currency = currency;
  },
  updateRates(newRates: CurrRateType): void {
    if (newRates?.EUR) pipe.currencies.forEach((c) => (pipe.rates[c] = newRates[c]));
  },
  getSymbol(currency: CurrType = pipe.currency): string {
    return pipe.symbol[currency];
  },
  getName(currency: CurrType = pipe.currency): string {
    return longName[currency];
  },
  getRate(currency: CurrType = pipe.currency): number {
    return rates[currency] || 1;
  },
  getPrice(price = 0, rate = pipe.getRate()): string {
    return (price * rate).toFixed(CURR_FORMAT);
  },
  getNote(price = 0, rate = pipe.getRate()): string {
    return ((price * rate) | 0).toString();
  },
  getCent(price = 0, rate = pipe.getRate()): string {
    return (price * rate).toFixed(CURR_FORMAT).slice(-CURR_FORMAT);
  },
  showPrice(price: number): string {
    return `${pipe.getSymbol()} ${pipe.getPrice(price)}`;
  }
};
