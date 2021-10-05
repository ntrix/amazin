//lists for creating MenuItem([label, linkTo, className, signOutAction?])

export const adminTemplate: MenuType = [
  ['Admin'],
  ['User List', '/user-list'],
  ['separator'],
  ['Warehouse'],
  ['Product Catalogues', '/product-list'],
  ['Order Database', '/order-list'],
  ['separator'],
  ['Instruction'],
  ['Admin Tour', process.env.REACT_APP_ADMIN_TOUR]
];
