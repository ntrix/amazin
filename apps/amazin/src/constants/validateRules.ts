/* TODO more generic rules */
export const validateRules: RulesType = {
  name: { msg: 'Name must be 2-50 characters long', RegEx: `^[a-zA-Z]+[a-zA-Z-_ ]{2,50}$` },
  email: { msg: 'Invalid email', RegEx: `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$` },
  password: {
    msg: 'Password must have 8-32 letters and include digit, lowercase and uppercase characters',
    RegEx: `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,32}$`
  },
  address: { msg: 'Invalid address', RegEx: `[a-zA-Z0-9_-]` },
  city: { msg: 'Invalid city', RegEx: `[a-zA-Z0-9_-]` },
  tel: { msg: 'Only numbers and dashes are allowed', RegEx: `[0-9-]` },
  postalCode: { msg: 'Only 5 numbers!', RegEx: `^[0-9]{5}$` },
  message: { msg: 'Your message should be at least 50 characters long!', RegEx: `.{50,}` }
};
