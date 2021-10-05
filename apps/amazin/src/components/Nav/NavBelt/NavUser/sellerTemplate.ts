//lists for creating MenuItem([label, linkTo, className, signOutAction?])

export function createSellerTemplate(userInfo: UserInfoType): MenuType {
  return [
    ['Profile'],
    ['Seller Profile', '/profile/seller'],
    ['Apply An Admin Account', !userInfo?.isAdmin ? '/contact/subject/Admin' : 'disabled'],
    ['separator'],
    ['Listing'],
    ['Product Lists & Catalogues', '/product-list/seller'],
    ['Retour Orders', 'disabled NOT IMPLEMENTED'],
    ['Sold Order List', '/order-list/seller'],
    ['separator'],
    ['Assistant'],
    ['International Shipping Courier', 'disabled NOT IMPLEMENTED'],
    ['Statistics Chart', process.env.REACT_APP_RATES_CHART],
    ['separator'],
    ['Instruction'],
    ['Seller Tour', process.env.REACT_APP_SELLER_TOUR]
  ];
}
