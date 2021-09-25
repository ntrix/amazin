const required: [string, string] = [' This field is required.', '^.{1,}'];

const password: RuleType[] = [
  required,
  [' Password must have 8-32 letters', `^.{8,32}$`],
  [
    ' Password must have at least one digit, lowercase and uppercase characters',
    `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]`
  ]
];

export const validateRules: RuleListType = {
  name: [
    required,
    [' Name must must have 2-50 letters.', `^.{2,50}$`],
    [' Name should be only characters and dashes.', `^[a-zA-Z]+[a-zA-Z- ]`]
  ],
  email: [required, [' Email is invalid!', `^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$`]],
  password,
  confirmPassword: password,
  oldPassword: password,
  address: [required, [' Address is invalid!', `[a-zA-Z0-9_-]`]],
  city: [required, [' City is invalid!', `[a-zA-Z0-9_-]`]],
  tel: [
    required,
    [' Telephone should have 6.20 digits.', `^.{6,20}$`],
    [' Telephone should be only numbers and dashes.', `[0-9-]`]
  ],
  postalCode: [
    required,
    [' Postal code should have 5 numbers!', `^.{5}$`],
    [' Postal code should be only numbers.', `^[0-9]`]
  ],
  message: [required, [' Message should have at least 20 characters long!', `.{20,}`]],
  required: [required]
};
