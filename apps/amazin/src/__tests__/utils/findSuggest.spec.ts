import { findSuggest, getPlainText } from '../../utils/findSuggest';

describe('findSuggest', () => {
  test('returns an empty array when productList or keyword is missing', () => {
    expect(findSuggest([], '')).toEqual([]);
    expect(findSuggest(null as never, 'phone')).toEqual([]);
    expect(findSuggest([{ name: 'iPhone 12' }], '')).toEqual([]);
  });

  test('filters out products that do not match the keyword', () => {
    const result = findSuggest([{ name: 'iPhone 12' }, { name: 'Samsung TV' }], 'phone');
    expect(result).toHaveLength(1);
    expect(getPlainText(result[0].name)).toBe('iPhone 12');
  });

  test('matches case-insensitively', () => {
    const result = findSuggest([{ name: 'iPhone 12' }], 'IPHONE');
    expect(result).toHaveLength(1);
  });

  test('matches out-of-order/fuzzy characters as long as they appear in sequence', () => {
    const result = findSuggest([{ name: 'iPhone 12' }], 'ip12');
    expect(result).toHaveLength(1);
    expect(getPlainText(result[0].name)).toBe('iPhone 12');
  });

  test('ranks a contiguous match above a widely scattered fuzzy match', () => {
    const result = findSuggest([{ name: 'Package On Demand' }, { name: 'iPod' }], 'pod');
    expect(result.map((r) => getPlainText(r.name))).toEqual(['iPod', 'Package On Demand']);
  });
});
