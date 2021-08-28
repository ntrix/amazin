//lists for creating MenuItem([label, linkTo, className, signOutAction?])

export function createSellerTemplate(userInfo) {
  return [
    ['Profile'],
    ['Seller Profile', '/profile/seller'],
    [
      'Apply An Admin Account',
      !userInfo?.isAdmin ? '/contact/subject/Admin' : 'disabled'
    ],
    ['separator'],
    ['Listing'],
    ['Product Lists & Catalogues', '/product-list/seller'],
    ['Sold Order List', '/order-list/seller'],
    ['separator'],
    ['Assistant'],
    ['International Shipping Courier', 'disabled'],
    ['Sell Statistics', 'disabled']
  ];
}
