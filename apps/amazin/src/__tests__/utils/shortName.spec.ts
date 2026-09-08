import { shortName } from '../../utils/shortName';

describe('shortName', () => {
  test('returns "Sign In" when there is no user name', () => {
    expect(shortName(undefined)).toBe('Sign In');
    expect(shortName('')).toBe('Sign In');
  });

  test('returns the full name when no length limit is given', () => {
    expect(shortName('Ada Lovelace')).toBe('Ada Lovelace');
  });

  test('truncates the first word and adds ".." when it exceeds the length', () => {
    expect(shortName('Alexandria', 5)).toBe('Alexa..');
  });

  test('does not add ".." when the first word already fits within the length', () => {
    expect(shortName('Ada Lovelace', 5)).toBe('Ada');
  });
});
