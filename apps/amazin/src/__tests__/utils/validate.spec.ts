import { validate } from '../../utils/validate';

describe('validate - email rule', () => {
  test('returns required-field message when value is empty', () => {
    const result = validate('email', '');
    expect(result).toContain('This field is required.');
  });

  test('returns empty string when value passes all rules', () => {
    const result = validate('email', 'user@example.com');
    expect(result).toBe('');
  });

  test('returns format message, not required message, when value is non-empty but invalid', () => {
    const result = validate('email', 'abc');
    expect(result).toContain('Email is invalid!');
    expect(result).not.toContain('This field is required.');
  });

  test('rejects a single-character top-level domain (boundary of the {2,} quantifier)', () => {
    const result = validate('email', 'user@example.c');
    expect(result).toContain('Email is invalid!');
  });
});

describe('validate - unknown rule type', () => {
  test('returns empty string when the type has no configured rules', () => {
    const result = validate('notARealType', 'anything');
    expect(result).toBe('');
  });
});
