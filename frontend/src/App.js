import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";

import { signout } from "./Controllers/userActions";
import { listProductCategories } from "./Controllers/productActions";

import SigninScreen from "./Features/Auth/SigninScreen";
import RegisterScreen from "./Features/Auth/RegisterScreen";

import AdminRoute from "./Features/Route/AdminRoute";
import PrivateRoute from "./Features/Route/PrivateRoute";
import SellerRoute from "./Features/Route/SellerRoute";

import CartScreen from "./Features/Checkout/CartScreen";
import PaymentMethodScreen from "./Features/Checkout/PaymentMethodScreen";
import ShippingAddressScreen from "./Features/Checkout/ShippingAddressScreen";

import OrderHistoryScreen from "./Features/Order/OrderHistoryScreen";
import OrderListScreen from "./Features/Order/OrderListScreen";
import OrderScreen from "./Features/Order/OrderScreen";
import PlaceOrderScreen from "./Features/Order/PlaceOrderScreen";

import ProductEditScreen from "./Features/Product/ProductEditScreen";
import ProductListScreen from "./Features/Product/ProductListScreen";
import ProductScreen from "./Features/Product/ProductScreen";
import SearchScreen from "./Features/Product/SearchScreen";

import MapScreen from "./Features/User/MapScreen";
import ProfileScreen from "./Features/User/ProfileScreen";
import UserEditScreen from "./Features/User/UserEditScreen";
import UserListScreen from "./Features/User/UserListScreen";

import HomeScreen from "./Features/HomeScreen";
import SellerScreen from "./Features/SellerScreen";

import SearchBox from "./components/SearchBox";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import Logo from "./img/a.svg";
import Cart from "./img/cart.png";

function App() {
  const cart = useSelector((state) => state.cart);
  const [dropTimeout, setDropTimeout] = useState(0);
  const [hasSidebar, setSidebar] = useState(false);
  const [hasDropdown, setDropdown] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  function getShortenName(user, length) {
    const shortName = user?.name ? user.name.split(" ")[0] : "Sign in";
    return !length
      ? shortName
      : shortName.slice(0, length) + (shortName.slice(length) ? ".." : "");
  }
  const addMenuItem = (setMenu) => ([text, link, className, action]) => {
    if (text == "separator") return <div className="separator"></div>;
    const inner = () =>
      !link && !className ? (
        <strong>{text}</strong>
      ) : link == "disabled" ? (
        <Link className="disabled">{text}</Link>
      ) : link.startsWith("https://") ? (
        <a href={link} target="_blank">
          {text}
        </a>
      ) : (
        <Link
          to={link}
          className={className}
          onClick={() => {
            setMenu(false);
            if (action) action();
          }}
        >
          {text}
        </Link>
      );
    return <li key={text}>{inner()}</li>;
  };
  const addSideMenuItem = addMenuItem(setSidebar);
  const addDropMenuItem = addMenuItem(setDropdown);

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className={"grid-container" + (hasSidebar ? " no-scroll" : "")}>
        <header className="row">
          <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebar(true)}
          >
            <i className="fa fa-bars"></i>
          </button>
          <Link className="nav-item mobile-s" to="/">
            <div className="brand">
              <img className="logo" src={Logo} alt="logo" />
              <span className="mobile">mazin'</span>
            </div>
          </Link>
          <Link to="/map" className="nav-item location flex">
            <div className="nav-item__col">
              <i className="fa fa-map-marker" aria-hidden="true"></i>
            </div>
            <div className="nav-item__col tablet">
              <span className="nav-item__line-1">Deliver to your</span>
              <span className="nav-item__line-2">Location?</span>
            </div>
          </Link>

          <div className="nav-item search-box">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <>
            {userInfo ? (
              <div
                className="nav-item dropdown"
                onMouseEnter={() =>
                  setDropTimeout(setTimeout(() => setDropdown(true), 350))
                }
                onMouseLeave={() => {
                  clearTimeout(dropTimeout);
                  setDropdown(false);
                }}
              >
                <div className="nav-item__col">
                  <span className="nav-item__line-1">
                    Hi, {getShortenName(userInfo, 7)}
                  </span>
                  <span className="nav-item__line-2">
                    Account<span className="pc"> & Lists</span>{" "}
                    <i className="fa fa-caret-down"></i>{" "}
                  </span>
                </div>
                {hasDropdown && (
                  <ul className="dropdown__menu">
                    {[
                      ["Informations"],
                      ["Your Profile", "/profile"],
                      ["separator"],
                      ["Orders"],
                      ["Your Order History", "/order-history"],
                      ["Returns", "disabled"],
                      ["Contact Us", "https://ntien.com"],
                      ["separator"],
                      ["Account"],
                      ["Sign Out", "#signout", , signoutHandler],
                    ].map(addDropMenuItem)}
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <div className="nav-item__col">
                  <span className="nav-item__line-1">Hi, Sign in</span>
                  <span className="nav-item__line-2">
                    Account & Lists <i className="fa fa-caret-down"></i>{" "}
                  </span>
                </div>
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div
                className="nav-item dropdown"
                onMouseEnter={() =>
                  setDropTimeout(setTimeout(() => setDropdown(true), 350))
                }
                onMouseLeave={() => {
                  clearTimeout(dropTimeout);
                  setDropdown(false);
                }}
              >
                <div className="nav-item__col">
                  <span className="nav-item__line-1">Seller</span>
                  <span className="nav-item__line-2">
                    Desk
                    <i className="fa fa-caret-down"></i>
                  </span>
                </div>
                {hasDropdown && (
                  <ul className="dropdown__menu">
                    {[
                      ["Profile"],
                      ["Seller Profile", "/profile/seller"],
                      ["separator"],
                      ["Listing"],
                      ["Product List", "/product-list/seller"],
                      ["Sold Order List", "/order-list/seller"],
                      ["separator"],
                      ["Assistant"],
                      ["Sell Statistics", "disabled"],
                    ].map(addDropMenuItem)}
                  </ul>
                )}
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div
                className="nav-item dropdown"
                onMouseEnter={() =>
                  setDropTimeout(setTimeout(() => setDropdown(true), 350))
                }
                onMouseLeave={() => {
                  clearTimeout(dropTimeout);
                  setDropdown(false);
                }}
              >
                <div className="nav-item__col">
                  <span className="nav-item__line-1">Admin</span>
                  <span className="nav-item__line-2">
                    Tools
                    <i className="fa fa-caret-down"></i>
                  </span>
                </div>
                {hasDropdown && (
                  <ul className="dropdown__menu">
                    {[
                      ["Admin"],
                      ["User List", "/user-list"],
                      ["separator"],
                      ["Database"],
                      ["Product Catalogue", "/product-list"],
                      ["All Order List", "/order-list"],
                      ["separator"],
                      ["Help"],
                      ["Quick Tutor!", "disabled"],
                    ].map(addDropMenuItem)}
                  </ul>
                )}
              </div>
            )}
            <Link className="nav-item dropdown tablet disabled">
              <div className="nav-item__col">
                <span className="nav-item__line-1">Return</span>
                <span className="nav-item__line-2">& Orders</span>
              </div>
            </Link>
            <Link to="/cart" className="nav-item nav-item__cart flex">
              <div className="nav-item__col">
                <span className="nav-item__line-1 cart--count">
                  {cartItems.length}
                </span>
                <span className="nav-item__line-2">
                  <img src={Cart} alt="Cart"></img>
                </span>
              </div>
              <div className="nav-item__col pc">
                <span className="nav-item__line-1">Shopping-</span>
                <span className="nav-item__line-2">Basket</span>
              </div>
            </Link>
          </>
        </header>
        <aside className={hasSidebar ? "open" : ""}>
          <button
            onClick={() => setSidebar(false)}
            id="close-sidebar-btn"
            className="close-sidebar"
            type="button"
          >
            <i className="fa fa-times"></i>
          </button>
          <li onClick={() => setSidebar(false)}>
            <Link to="/profile" className="sidebar-user">
              <i className="fa fa-user-circle" aria-hidden="true"></i>
              {" Hello, " + getShortenName(userInfo, 14)}
            </Link>
          </li>
          <ul className="categories">
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
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
                ["FAQ & Contact", "https://ntien.com"],
                ["separator"],
                ["Account"],
                userInfo
                  ? ["Sign Out", "#signout", , signoutHandler]
                  : ["Sign In", "/signin"],
                [""],
                ["separator"],
                ["separator"],
                ["ntien.com 2020", "disabled"],
                ["separator"],
                ["separator"],
              ].map(addSideMenuItem)
            )}
          </ul>
        </aside>
        <label
          className={hasSidebar ? "click-catcher" : ""}
          htmlFor="close-sidebar-btn"
        ></label>
        <main className="container">
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/place-order" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/order-history"
            component={OrderHistoryScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/profile/seller"
            component={ProfileScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/product-list"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/product-list/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/order-list"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/user-list" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/product-list/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/order-list/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          Amazin' eCommerce platform, all right reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
