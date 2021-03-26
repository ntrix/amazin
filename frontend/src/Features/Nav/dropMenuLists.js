export function dropMenuNoUser() {
  return [
    ["Account"],
    ["Sign In", "/signin"],
    ["separator"],
    ["New customer? Start here.", "/register"],
  ];
}

export function dropMenuUser(userInfo, extraAction) {
  return [
    ["Informations"],
    ["Your Profile", "/profile"],
    ["Your Shipping Addresses", "/shipping"],
    ["FAQs & Generals", "/customer"],
    ["separator"],
    ["Orders"],
    ["Your Order History", "/order-history"],
    ["Your Payment Method", "/payment"],
    ["Returns", "disabled"],
    ["Contact Us", "/contact/subject/Orders"],
    ["separator"],
    ["Account"],
    [
      "Apply & Verify Your Seller Account",
      userInfo?.isSeller ? "disabled" : "/contact/subject/Seller",
    ],
    ["Sign Out", "#signout", , extraAction],
  ];
}

export function dropMenuSeller(userInfo) {
  return [
    ["Profile"],
    ["Seller Profile", "/profile/seller"],
    [
      "Apply An Admin Account",
      !userInfo?.isAdmin ? "/contact/subject/Admin" : "disabled",
    ],
    ["separator"],
    ["Listing"],
    ["Product Lists & Catalogues", "/product-list/seller"],
    ["Sold Order List", "/order-list/seller"],
    ["separator"],
    ["Assistant"],
    ["International Shipping Courier", "disabled"],
    ["Sell Statistics", "disabled"],
  ];
}

export function dropMenuAdmin() {
  return [
    ["Admin"],
    ["User List", "/user-list"],
    ["separator"],
    ["Warehouse"],
    ["Product Catalogues", "/product-list"],
    ["Order Database", "/order-list"],
    ["separator"],
    ["Instruction"],
    ["Quick Tutor!", "disabled"],
  ];
}
