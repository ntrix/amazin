import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import NavDropMenu, { addMenuItem } from "./components/NavMenu";
import SearchBox from "./components/SearchBox";
import { listProductCategories } from "./Controllers/productActions";
import { signout } from "./Controllers/userActions";
import MainRoute from "./Features/Route/MainRoute";
import Logo from "./img/a.svg";

function App() {
  const cart = useSelector((state) => state.cart);
  const [hasSidebar, setSidebar] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const timeoutId = useRef(0);
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

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

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
    dispatch(listProductCategories());
  }, [dispatch]);
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
                  ["separator"],
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
                  ["separator"],
                  ["Orders"],
                  ["Your Order History", "/order-history"],
                  ["Returns", "disabled"],
                  ["Contact Us", "#contact", "disabled"],
                  ["separator"],
                  ["Account"],
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
                  ["separator"],
                  ["Listing"],
                  ["Product List", "/product-list/seller"],
                  ["Sold Order List", "/order-list/seller"],
                  ["separator"],
                  ["Assistant"],
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
                onClick={() => setSidebar(true)}
              >
                <div className="sprite__bars"></div>
                <b>All</b>
              </div>
            </div>
            <div className="nav__fill">
              {[
                ["New Releases", "/search/category/all", "nav-main__item"],
                ["Netflix Video", "/video", "nav-main__item"],
                ["Top Deals", "/deal", "nav-main__item"],
                ["Best Sellers", "/", "nav-main__item"],
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
                <a href="#">
                  <sup>Advertisement</sup> here? Contact us for more
                  informations
                </a>
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
                ["New Releases", "/search/category/all"],
                ["Top Sellers", "/"],
                ["separator"],
                ["Categories"],
                ...categories.map((c) => [c, "/search/category/" + c]),
                ["separator"],
                ["Help & Setting"],
                ["(Seller) Profile", "/profile/seller"],
                ["Shipping Address", "/shipping"],
                ["Orders & Returns", "/order-history"],
                ["Statistics / AB Testing", "disabled"],
                ["FAQ & Contact", "#contact", "disabled"],
                ["separator"],
                ["Account"],
                userInfo
                  ? ["Sign Out", "#signout", , signoutHandler]
                  : ["Sign In", "/signin"],
                [""],
                ["separator"],
                ["separator"],
                ["#contact 2020", "disabled"],
                ["separator"],
                ["separator"],
              ].map(addMenuItem(setSidebar))
            )}
          </ul>
        </aside>
        <label
          className={
            hasSidebar ? "click-catcher" : hasDropdown ? "underlay" : ""
          }
          htmlFor="btn--close-sidebar"
        ></label>
        <main className="container--flex">
          <div className="col-fill">
            <MainRoute />
          </div>
        </main>
        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
