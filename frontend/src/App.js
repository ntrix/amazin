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
import { pipe } from "./utils";

export default function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const { sessionCurrency } = useSelector((state) => state.currencyType);
  const [currency, setCurrency] = useState(
    userInfo?.currency || sessionCurrency || pipe.currencyType
  );

  const timeoutId = useRef(0);
  const [hasSidebar, setSidebar] = useState(false);
  const [hasDropdown, setDropdown] = useState(false);
  const onEnterHandle = () => {
    clearTimeout(timeoutId.current - 99);
    timeoutId.current = setTimeout(() => setDropdown(true), 500);
  };
  const onLeaveHandle = () => {
    timeoutId.current = 99 + setTimeout(() => setDropdown(false), 500);
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
        <Link to={linkTo} onClick={() => setDropdown(false)}>
          {label}
        </Link>
      </div>
    );
  };

  useEffect(() => {
    setCurrency(userInfo?.currency || sessionCurrency || pipe.currencyType);
    pipe.setCurrency(userInfo?.currency || sessionCurrency);
    dispatch(updateCurrencyRates());
    console.log({ currency }, pipe.currencyType);
    dispatch(listProductCategories());
  }, [dispatch, sessionCurrency]);

  return (
    <BrowserRouter>
      <div className={"container--grid" + (hasSidebar ? " scroll--off" : "")}>
        <header id="navbar">
          <div className="nav-belt row">
            <Link className="phone--off" to="/">
              <div className="brand">
                <img className="logo" src={Logo} alt="logo" />
                <span className="mobile--off">mazin'</span>
              </div>
            </Link>

            <Link className="location flex" to="/map">
              <div className="sprite__locator"></div>
              <div className="tablet--off">
                <div className="nav__line-1">Deliver to your</div>
                <div className="nav__line-2">Location?</div>
              </div>
            </Link>

            <div className="nav__search">
              <SearchBox />
            </div>

            <div
              className={"dropdown phone--off"}
              onMouseEnter={onEnterHandle}
              onClick={onEnterHandle}
              onMouseLeave={onLeaveHandle}
            >
              <div>
                <div className="nav__line-1"> </div>
                <div className="nav__line-2 sprite__wrapper">
                  <span className={"sprite flag " + sessionCurrency}></span>
                  <i className="fa fa-caret-down"></i>
                </div>
              </div>
              <ul
                className={
                  "dropdown__menu currency" + (hasDropdown ? " show" : "")
                }
              >
                {[
                  ["Change Currency"],
                  [pipe.getName("EUR"), "/currency/cType/EUR"],
                  [, , "separator"],
                  ...pipe.currencies
                    .slice(1) //get supported currencies list without default "EUR", which is listed above the separator
                    .map((cType) => [
                      pipe.getName(cType),
                      "/currency/cType/" + cType,
                    ]),
                ].map(([label, linkTo, className], id) =>
                  !linkTo ? (
                    <li className={className}>{label}</li>
                  ) : (
                    <Link
                      key={id}
                      to={linkTo}
                      onClick={() =>
                        localStorage.setItem(
                          "backToHistory",
                          window.location.pathname
                        )
                      }
                    >
                      <div
                        className={
                          "sprite__wrapper" +
                          (label === pipe.getName(sessionCurrency)
                            ? " active"
                            : "")
                        }
                      >
                        <div className="sprite circle"></div>
                        <span>{label}</span>
                      </div>
                    </Link>
                  )
                )}
                {[
                  ["separator"],
                  ["Exchange"],
                  ["Currency Calculator", "disabled"],
                ].map(addMenuItem())}
                <a
                  href="https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"
                  target="_blank"
                >
                  <div className="sprite__wrapper">
                    <div className={"sprite flag xl " + sessionCurrency}></div>
                    <span>Exchange Rates</span>
                  </div>
                </a>
              </ul>
            </div>

            {!userInfo && (
              <NavDropMenu
                label="Hello, Sign in^Account^ & Lists"
                isDropped={hasDropdown}
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
                onClickItem={setDropdown}
                dropMenu={[
                  ["Account"],
                  ["Sign In", "/signin"],
                  ["separator", "1"],
                  ["New customer? Start here.", "/register"],
                ]}
              />
            )}

            {userInfo && (
              <NavDropMenu
                label={"Hello, " + shortName(userInfo, 8) + "^Account^ & Lists"}
                isDropped={hasDropdown}
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
                onClickItem={setDropdown}
                dropMenu={[
                  ["Informations"],
                  ["Your Profile", "/profile"],
                  ["Your Shipping Addresses", "/shipping"],
                  ["FAQs & Generals", "/customer"],
                  ["separator", "2"],
                  ["Orders"],
                  ["Your Order History", "/order-history"],
                  ["Your Payment Method", "/payment"],
                  ["Returns", "disabled"],
                  ["Contact Us", "/contact/subject/Orders"],
                  ["separator", "3"],
                  ["Account"],
                  [
                    "Create And Verify Seller Account",
                    userInfo?.isSeller ? "disabled" : "/contact/subject/Seller",
                  ],
                  ["Sign Out", "#signout", , signoutHandler],
                ]}
              />
            )}

            {userInfo?.isSeller && (
              <NavDropMenu
                label="Seller^Desk"
                isDropped={hasDropdown}
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
                onClickItem={setDropdown}
                dropMenu={[
                  ["Profile"],
                  ["Seller Profile", "/profile/seller"],
                  ["Apply An Admin Account", "/contact/subject/Admin"],
                  ["separator", "4"],
                  ["Listing"],
                  ["Product Lists & Catalogues", "/product-list/seller"],
                  ["Sold Order List", "/order-list/seller"],
                  ["separator", "5"],
                  ["Assistant"],
                  ["International Shipping Courier", "disabled"],
                  ["Sell Statistics", "disabled"],
                ]}
              />
            )}

            {userInfo?.isAdmin && (
              <NavDropMenu
                label="Admin^Tools"
                attr="phone--off"
                isDropped={hasDropdown}
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
                onClickItem={setDropdown}
                dropMenu={[
                  ["Admin"],
                  ["User List", "/user-list"],
                  ["separator", "7"],
                  ["Warehouse"],
                  ["Product Catalogues", "/product-list"],
                  ["Order Database", "/order-list"],
                  ["separator", "8"],
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
                onClick={() => setSidebar(true)}
              >
                <div className="sprite__bars"></div>
                <b>All</b>
              </div>
            </div>

            <div className="nav__fill">
              {[
                ["Netflix Video", "/video", "nav-main__item"],
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

        <aside className={hasSidebar ? "sidebar opened" : "sidebar"}>
          <button onClick={() => setSidebar(false)} id="btn--close-sidebar">
            <div className="sprite__close-btn"></div>
          </button>
          <li onClick={() => setSidebar(false)}>
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
                ["Top Deals", "/deal"],
                ["New Releases", "/search/category/All/order/newest"],
                ["Best Sellers", "/banner/bestseller"],
                ["separator", "9"],
                ["Categories"],
                ["Netflix Video", "/video"],
                ...categories.map((c) => [c, "/search/category/" + c]),
                ["separator", "10"],
                ["Help & Setting"],
                ["(Seller) Profile", "/profile/seller"],
                ["Shipping Address", "/shipping"],
                ["Orders & Returns", "/order-history"],
                ["Statistics / AB Testing", "disabled"],
                ["Currency Setting", "/currency/cType/0"],
                ["FAQ & Contact", "/contact/subject/FAQ"],
                ["separator", "11"],
                ["Account"],
                ["Customer Service", "/customer"],
                userInfo
                  ? ["Sign Out", "#signout", , signoutHandler]
                  : ["Sign In", "/signin"],
                [""],
                ["separator", "12"],
                ["separator", "13"],
                ["#contact 2020", "disabled"],
                ["separator", "14"],
                ["separator", "15"],
              ].map(addMenuItem(setSidebar))
            )}
          </ul>
        </aside>

        <label
          className={hasSidebar ? "click-catcher" : ""}
          htmlFor="btn--close-sidebar"
        ></label>

        <main className="container">
          <div className="col-fill">
            <MainRoute />
          </div>
          <div className={hasDropdown ? "underlay" : ""}></div>
        </main>

        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}
