import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { signout } from "../../Controllers/userActions";
import { pipe, shortName, savePath } from "../../utils";
import { MenuItem } from "./MenuItem";

export default function SidebarMenu({ currency, shadowFor, setShadowFor }) {
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  return (
    <aside className={"sidebar" === shadowFor ? "sidebar opened" : "sidebar"}>
      <button onClick={() => setShadowFor("")} id="btn--close-sidebar">
        <div className="sprite__close-btn"></div>
      </button>
      <li onClick={() => setShadowFor("")}>
        <Link to="/profile" className="sidebar__header">
          <div className="sprite__user"></div>
          {"Hello, " + shortName(userInfo)}
        </Link>
      </li>
      <ul className="categories">
        {loadingCategories ? (
          <LoadingBox />
        ) : errorCategories ? (
          <MessageBox variant="danger">{errorCategories}</MessageBox>
        ) : (
          [
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
            ["Currency Setting", "/currency/cType/EUR", , savePath("/curr")],
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
              ? ["Sign Out", "#signout", , () => dispatch(signout())]
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
            [
              "Your Order List",
              userInfo?.isSeller ? "/order-list" : "disabled",
            ],
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
          ].map(MenuItem(setShadowFor))
        )}
      </ul>
    </aside>
  );
}
