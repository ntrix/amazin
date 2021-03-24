import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import NavDropMenu, { addMenuItem } from "./components/NavMenu";
import SearchBox from "./components/SearchBox";
import {
  listProductCategories,
  updateCurrencyRates,
} from "./Controllers/productActions";
import { signout } from "./Controllers/userActions";
import MainRoute from "./Features/Route/MainRoute";
import Logo from "./img/a.svg";
import { pipe, savePath } from "./utils";

export default function App() {
  const dispatch = useDispatch();
  const { sessionCurrency, rates, success } = useSelector(
    (state) => state.currencyType
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [currency, setCurrency] = useState(userInfo?.currency || pipe.currency);

  const timeoutId = useRef(0);

  const [shadowFor, setShadowFor] = useState("");

  const [hasSidebar, setSidebar] = useState(false);
  const [hasDropdown, setDropdown] = useState(false);
  const onEnterHandle = () => {
    clearTimeout(timeoutId.current - 99);
    timeoutId.current = setTimeout(() => setShadowFor("navDrop"), 450);
  };
  const onLeaveHandle = () => {
    timeoutId.current = 99 + setTimeout(() => setShadowFor(""), 450);
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList);

  function shortName(user, length) {
    if (!user) return "Sign In";
    if (!length) return user.name;
    const name = user.name.split(" ")[0];
    return name.slice(0, length) + (name.length > length ? ".." : "");
  }

  const navMainItem = ([label, linkTo, className]) => {
    return (
      <div key={label} className={className}>
        <Link to={linkTo} onClick={() => setShadowFor("")}>
          {label}
        </Link>
      </div>
    );
  };

  useEffect(() => {
    pipe.updateRates(rates);
  }, [success]);
  useEffect(() => {
    pipe.setCurrency(
      userInfo?.currency ||
        sessionCurrency ||
        localStorage.getItem("currency") ||
        pipe.currency
    );
    setCurrency(pipe.currency);
    dispatch(updateCurrencyRates());
    dispatch(listProductCategories());
  }, [dispatch, pipe.currency, userInfo?.currency, sessionCurrency]);

  return (
    <BrowserRouter>
      <div
        className={
          "container--grid" + ("sidebar" === shadowFor ? " scroll--off" : "")
        }
      >
        <header id="navbar">
          <div className="nav-belt row">
            <Link className="phone--off" to="/">
              <div className="brand">
                <img className="logo" src={Logo} alt="logo" />
                <span className="mobile--off">mazin'</span>
              </div>
            </Link>

            <Link className="location flex" to="/map" onClick={savePath()}>
              <div className="sprite__locator"></div>
              <div className="tablet--off">
                <div className="nav__line-1">Deliver to your</div>
                <div className="nav__line-2">Location?</div>
              </div>
            </Link>

            <div className="nav__search">
              <SearchBox shadowFor={shadowFor} setShadowFor={setShadowFor} />
            </div>

            <div
              className={"dropdown mobile--off"}
              onMouseEnter={() => setShadowFor("currency")}
              onClick={() => setShadowFor("currency")}
              onMouseLeave={() => setShadowFor("")}
            >
              <div>
                <div className="nav__line-1"> </div>
                <div className="nav__line-2 sprite__wrapper">
                  <span className={"sprite flag " + currency}></span>
                  <i className="fa fa-caret-down"></i>
                </div>
              </div>
              <ul className="dropdown__menu currency show">
                <li>Change Currency</li>
                {["EUR", "separator", ...pipe.currencies.slice(1)].map(
                  (label, id) =>
                    label === "separator" ? (
                      <div key={id} className="separator ml-1"></div>
                    ) : (
                      <Link
                        key={id}
                        to={"/currency/cType/" + label}
                        className={label === currency ? "active" : ""}
                        onClick={savePath("/curr")}
                      >
                        <div className="sprite__wrapper">
                          <div className="sprite circle"></div>
                          <span>{pipe.getName(label)}</span>
                        </div>
                      </Link>
                    )
                )}
                <div className="separator"></div>
                <li>Currency Calculator</li>
                <li className="calculator disabled">
                  <Link to="#">€ - EUR - Euro</Link>
                  <Link to="#">Base</Link>
                </li>
                <div className="separator"></div>
                <a
                  href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
                  target="_blank"
                >
                  <div className="sprite__wrapper">
                    <div className={"sprite flag xl " + currency}></div>
                    <span>Exchange Reference Rates</span>
                  </div>
                </a>
              </ul>
            </div>

            {!userInfo && (
              <NavDropMenu
                label="Hello, Sign in^Account^ & Lists"
                attr="nav-user"
                isDropped={"navDrop" === shadowFor}
                onEnterHandle={onEnterHandle}
                onClickItem={setShadowFor}
                onLeaveHandle={onLeaveHandle}
                dropMenu={[
                  ["Account"],
                  ["Sign In", "/signin"],
                  ["separator"],
                  ["New customer? Start here.", "/register"],
                ]}
              />
            )}

            {userInfo && (
              <NavDropMenu
                label={"Hello, " + shortName(userInfo, 8) + "^Account^ & Lists"}
                attr="nav-user"
                isDropped={"navDrop" === shadowFor}
                onEnterHandle={onEnterHandle}
                onClickItem={setShadowFor}
                onLeaveHandle={onLeaveHandle}
                dropMenu={[
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
                    "Create & Verify Seller Account",
                    userInfo?.isSeller ? "disabled" : "/contact/subject/Seller",
                  ],
                  ["Sign Out", "#signout", , signoutHandler],
                ]}
              />
            )}

            {userInfo?.isSeller && (
              <NavDropMenu
                label="Seller^Desk"
                attr="nav-seller"
                isDropped={"navDrop" === shadowFor}
                onEnterHandle={onEnterHandle}
                onClickItem={setShadowFor}
                onLeaveHandle={onLeaveHandle}
                dropMenu={[
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
                ]}
              />
            )}

            {userInfo?.isAdmin && (
              <NavDropMenu
                label="Admin^Tools"
                attr="nav-admin phone--off"
                isDropped={"navDrop" === shadowFor}
                onEnterHandle={onEnterHandle}
                onClickItem={setShadowFor}
                onLeaveHandle={onLeaveHandle}
                dropMenu={[
                  ["Admin"],
                  ["User List", "/user-list"],
                  ["separator"],
                  ["Warehouse"],
                  ["Product Catalogues", "/product-list"],
                  ["Order Database", "/order-list"],
                  ["separator"],
                  ["Instruction"],
                  ["Quick Tutor!", "disabled"],
                ]}
              />
            )}

            <NavDropMenu label="Return^& Orders" attr="tablet--off disabled" />

            <Link className="nav__cart flex" to="/cart">
              <div>
                <div className="cart__counter">{cartItems.length}</div>
                <div className="sprite__cart"></div>
              </div>
              <div className="pc-low--off">
                <div className="nav__line-1">Shopping-</div>
                <div className="nav__line-2">Basket</div>
              </div>
            </Link>
          </div>
          <div className="nav-main row">
            <div className="ml-1 nav__left">
              <div
                className="open-sidebar nav-main__item flex"
                onClick={() => setShadowFor("sidebar")}
              >
                <div className="sprite__bars"></div>
                <b>All</b>
              </div>
            </div>

            <div className="nav__fill">
              {[
                ["Netflux Video", "/video", "nav-main__item"],
                ["Top Deals", "/deal", "nav-main__item"],
                [
                  "New Releases",
                  "/search/category/All/order/newest",
                  "nav-main__item",
                ],
                ["Customer Service", "/customer", "nav-main__item"],
                ["Best Sellers", "/banner/bestseller", "nav-main__item"],
              ].map(navMainItem)}
              {loadingCategories ? (
                <LoadingBox />
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                categories
                  .slice(0, 8)
                  .map((c) =>
                    navMainItem([c, "/search/category/" + c, "nav-main__item"])
                  )
              )}
            </div>

            <div className="nav__right">
              <div className="nav-main__item">
                <Link to="/contact/subject/Ads">
                  <sup>Your Ads</sup> here on this place? Contact us
                </Link>
              </div>
            </div>
          </div>
        </header>

        <aside
          className={"sidebar" === shadowFor ? "sidebar opened" : "sidebar"}
        >
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
                [
                  "Currency Setting",
                  "/currency/cType/EUR",
                  ,
                  savePath("/curr"),
                ],
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
                  ? ["Sign Out", "#signout", , signoutHandler]
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
                [
                  "User Management",
                  userInfo?.isAdmin ? "/user-list" : "disabled",
                ],
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

                ["#contact dev team", "disabled"],
                [""],
                ["separator"],
                ["separator"],
              ].map(addMenuItem(setShadowFor))
            )}
          </ul>
        </aside>

        <label
          className={"sidebar" === shadowFor ? "click-catcher" : ""}
          htmlFor="btn--close-sidebar"
        ></label>

        <main className="container">
          <div className="col-fill">
            <MainRoute />
          </div>
          <div
            className={"underlay-" + shadowFor}
            onClick={() => setShadowFor("")}
          ></div>
        </main>

        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}
