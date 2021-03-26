import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import SearchBox from "./components/SearchBox";
import {
  listProductCategories,
  updateCurrencyRates,
} from "./Controllers/productActions";
import { signout } from "./Controllers/userActions";
import DropMenuCurrency from "./Features/Nav/DropMenuCurrency";
import {
  dropMenuAdmin,
  dropMenuNoUser,
  dropMenuSeller,
  dropMenuUser,
} from "./Features/Nav/dropMenuLists";
import { MenuItem } from "./Features/Nav/MenuItem";
import "./Features/Nav/nav.css";
import NavDropBtn from "./Features/Nav/NavDropBtn";
import SidebarMenu from "./Features/Nav/SidebarMenu";
import MainRoute from "./Features/Route/MainRoute";
import { pipe, savePath, shortName } from "./utils";
import Logo from "./img/a.svg";
import "./responsive.css";

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

  const onEnterHandle = () => {
    clearTimeout(timeoutId.current - 99);
    timeoutId.current = setTimeout(() => setShadowFor("navDrop"), 450);
  };
  const onLeaveHandle = () => {
    timeoutId.current = 99 + setTimeout(() => setShadowFor(""), 450);
  };

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = useSelector((state) => state.productCategoryList);

  const navMainItem = ([label, linkTo, className]) => {
    return (
      <div key={label} className={className}>
        <Link to={linkTo} onClick={() => setShadowFor("")}>
          {label}
        </Link>
      </div>
    );
  };

  const DropMenu = ({ menuList }) => (
    <ul className={"dropdown__menu" + ("navDrop" === shadowFor ? " show" : "")}>
      {menuList.map(MenuItem(setShadowFor))}
    </ul>
  );

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
        <header id="nav-bar">
          {/* NAV BELT, 1ST ROW */}
          <div className="nav-belt row">
            <Link className="phone--off" to="/">
              <div className="nav__brand">
                <img className="logo" src={Logo} alt="logo" />
                <span className="mobile--off">mazin'</span>
              </div>
            </Link>

            <Link className="nav__locator flex" to="/map" onClick={savePath()}>
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
              className={"dropdown nav__currency mobile--off"}
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

              <DropMenuCurrency currency={currency} />
            </div>

            {!userInfo && (
              <NavDropBtn
                label="Hello, Sign in^Account^ & Lists"
                className="nav__user"
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
              >
                <DropMenu menuList={dropMenuNoUser()} />
              </NavDropBtn>
            )}

            {userInfo && (
              <NavDropBtn
                label={"Hello, " + shortName(userInfo, 8) + "^Account^ & Lists"}
                className="nav__user"
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
              >
                <DropMenu
                  menuList={dropMenuUser(userInfo, () => dispatch(signout()))}
                />
              </NavDropBtn>
            )}

            {userInfo?.isSeller && (
              <NavDropBtn
                label="Seller^Desk"
                className="nav__seller"
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
              >
                <DropMenu menuList={dropMenuSeller(userInfo)} />
              </NavDropBtn>
            )}

            {userInfo?.isAdmin && (
              <NavDropBtn
                label="Admin^Tools"
                className="nav__admin phone--off"
                onEnterHandle={onEnterHandle}
                onLeaveHandle={onLeaveHandle}
              >
                <DropMenu menuList={dropMenuAdmin()} />
              </NavDropBtn>
            )}

            <NavDropBtn
              label="Return^& Orders"
              className="nav__return tablet--off disabled dark"
            />

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

          {/* NAV MAIN, "ND ROW" */}
          <div className="nav-main row">
            <div className="nav__left">
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
                  .slice(0, 15)
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

        <SidebarMenu
          currency={currency}
          shadowFor={shadowFor}
          setShadowFor={setShadowFor}
          userInfo={userInfo}
        />
        <label
          className={"sidebar" === shadowFor ? "click-catcher" : ""}
          htmlFor="btn--close-sidebar"
          aria-label="close sidebar button"
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
