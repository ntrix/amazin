export const validateRules: RulesType = {
  name: { RegEx: `^[a-zA-Z]+[a-zA-Z-_ ]{2,50}$`, msg: 'Name must be 2-50 characters long' },
  email: { RegEx: `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$`, msg: 'Invalid email' },
  password: {
    RegEx: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$`,
    msg: 'Password must have 8-32 letters and include digit, lowercase and uppercase characters'
  },
  address: { RegEx: `[a-zA-Z0-9_-]`, msg: 'Invalid address' },
  tel: { RegEx: `[0-9-]`, msg: 'Only numbers and dashes are allowed' },
  zip: { RegEx: `[0-9]{5}`, msg: 'Only numbers!' },
  message: { RegEx: `.{50,}`, msg: 'Your message should be at least 50 characters long!' }
};
