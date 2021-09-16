type CurrType = 'EUR' | 'GBP' | 'USD' | 'PLN' | 'CZK' | 'CHF';

type CurrRateType = Record<CurrType, number>;

type CurrNameType = Record<CurrType, string>;

type StorageType = any;

type CacheType = Record<string, any>;
