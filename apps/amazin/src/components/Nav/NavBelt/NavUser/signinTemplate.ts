//lists for creating MenuItem([label, linkTo, className, signOutAction?])

export const signinTemplate: MenuType = [
  ['Account'],
  ['Sign In', '/signin'],
  ['separator'],
  ['Information'],
  ['FAQs & Generals', '/customer'],
  ['Quick Tutor', process.env.REACT_APP_USER_TOUR],
  ['separator'],
  ['New customer? Start here.', '/register']
];
