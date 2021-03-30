import { pipe, savePath } from "../../utils";

//lists for creating MenuItem (clickHandle) ([label, linkTo, className, extraAction])

export function noUserMenuItems() {
  return [
    ["Account"],
    ["Sign In", "/signin"],
    ["separator"],
    ["New customer? Start here.", "/register"],
  ];
}

export function userMenuItems(userInfo, extraAction) {
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
    ["Sign Out", "#signout", "", extraAction],
  ];
}

export function sellerMenuItems(userInfo) {
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

export function adminMenuItems() {
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

export function sidebarMenuItems(userInfo, currency, categories, extraAction) {
  return [
    ["Trending"],
    ["Best Sellers", "/banner/bestseller"],
    ["Top Deals", "/deal"],
    ["New Releases", "/search/category/All/order/newest"],
    ["Home Page", "/"],
    ["separator"],
    ["Categories"],
    ["Netflux Video", "/video"],
    ...categories.map((c) => [c, "/search/category/" + c]),
    ["separator"],
    ["Privacy & Setting"],
    ["Your Favorite List", "disabled"],
    [
      "",
      "/currency/cType/" + currency,
      "sprite flag xl " + currency,
      savePath("/curr"),
    ],
    [
      pipe.getName(currency),
      "/currency/cType/" + currency,
      "pl-8",
      savePath("/curr"),
    ],
    ["Currency Setting", "/currency/cType/EUR", "", savePath("/curr")],
    ["Your Browsing History", "disabled"],
    ["Shipping Address", "/shipping"],
    ["Orders & Returns", "/order-history"],
    ["Statistics / AB Testing", "disabled"],
    ["FAQ & Help", "/contact/subject/FAQ"],
    [""],
    ["separator"],
    ["separator"],
    ["Your Account"],
    ["Your Profile", "/profile"],
    ["Customer Service", "/customer"],
    userInfo
      ? ["Sign Out", "#signout", "", extraAction]
      : ["Sign In", "/signin"],
    [""],
    ["separator"],
    ["separator"],
    ["Seller Account"],
    [
      "Your Seller Profile",
      userInfo?.isSeller ? "/profile/seller" : "disabled",
    ],
    [
      "Your Listing Products",
      userInfo?.isSeller ? "/product-list" : "disabled",
    ],
    ["Your Order List", userInfo?.isSeller ? "/order-list" : "disabled"],
    [""],
    ["separator"],
    ["separator"],
    ["Administration"],
    ["User Management", userInfo?.isAdmin ? "/user-list" : "disabled"],
    [
      "All Product Catalogues",
      userInfo?.isAdmin ? "/product-list" : "disabled",
    ],
    [
      "All Order Lists, Database",
      userInfo?.isAdmin ? "/order-list" : "disabled",
    ],
    [""],
    ["separator"],
    ["separator"],
    ["#contact developer", "disabled"],
    [""],
    ["separator"],
    ["separator"],
  ];
}
