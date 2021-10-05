//lists for creating MenuItem([label, linkTo, className, signOutAction?])

export function createUserTemplate(userInfo: UserInfoType, signOutAction: FnType): MenuType {
  return [
    ['Information'],
    ['Your Profile', '/profile'],
    ['Your Shipping Addresses', '/shipping'],
    ['FAQs & Generals', '/customer'],
    ['Quick Tutor', process.env.REACT_APP_USER_TOUR],
    ['Community', process.env.REACT_APP_COMMUNITY],
    ['separator'],
    ['Orders'],
    ['Your Order History', '/order-history'],
    ['Your Payment Method', '/payment'],
    ['Returns', 'disabled NOT IMPLEMENTED'],
    ['Contact Us', '/contact/subject/Orders'],
    ['separator'],
    ['Account'],
    ['Change Password', '/profile/password'],
    ['Apply & Verify Your Seller Account', userInfo?.isSeller ? 'disabled' : '/contact/subject/Seller'],
    ['Sign Out', '#signout', '', signOutAction]
  ];
}
