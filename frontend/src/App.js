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
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
    const shortName = user?.name ? user.name.split(" ")[0] : "sign in";
    return !length
      ? shortName
      : shortName.slice(0, length) + (shortName.slice(length) ? ".." : "");
  }
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="flex">
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="header__nav mobile-s" to="/">
              <div className="brand">
                <img className="logo" src={Logo} alt="logo" />
                <span className="mobile">mazin'</span>
              </div>
            </Link>
            <Link to="/map" className="header__nav location flex">
              <div className="header__option">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </div>
              <div className="header__option tablet">
                <span className="header__optionLineOne">Deliver to your</span>
                <span className="header__optionLineTwo">Location?</span>
              </div>
            </Link>
          </div>
          <div className="header__nav search-box">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <>
            {userInfo ? (
              <div className="header__nav dropdown">
                <div className="header__option">
                  <span className="header__optionLineOne">
                    Hi, {getShortenName(userInfo, 7)}
                  </span>
                  <span className="header__optionLineTwo">
                    Account<span className="pc"> & Lists</span>{" "}
                    <i className="fa fa-caret-down"></i>{" "}
                  </span>
                </div>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="">Returns</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/customer-service">FAQ & Contact</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <div className="header__option">
                  <span className="header__optionLineOne">Hi, sign in</span>
                  <span className="header__optionLineTwo">
                    Account & Lists <i className="fa fa-caret-down"></i>{" "}
                  </span>
                </div>
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="header__nav dropdown">
                <div className="header__option">
                  <span className="header__optionLineOne">Seller</span>
                  <span className="header__optionLineTwo">
                    Desk
                    <i className="fa fa-caret-down"></i>
                  </span>
                </div>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile/seller">Seller Profile</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/productlist/seller">Products List</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Selling List</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="header__nav dropdown">
                <div className="header__option">
                  <span className="header__optionLineOne">Dashboard</span>
                  <span className="header__optionLineTwo">
                    Admin
                    <i className="fa fa-caret-down"></i>
                  </span>
                </div>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/userlist">Administration</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/productlist">Products DB</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders DB</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/dashboard">Quick Help!</Link>
                  </li>
                </ul>
              </div>
            )}
            <Link to="/orderhistory" className="header__nav return tablet">
              <div className="header__option">
                <span className="header__optionLineOne disabled">Return</span>
                <span className="header__optionLineTwo disabled">& Orders</span>
              </div>
            </Link>
            <Link to="/cart" className="header__nav basket flex">
              <div className="header__option">
                <span className="header__optionLineOne header__basketCount">
                  {cartItems.length}
                </span>
                <span className="header__optionLineTwo header__basket">
                  <img className="cart" src={Cart} alt="Basket"></img>
                </span>
              </div>
              <div className="header__option pc">
                <span className="header__optionLineOne">Shopping-</span>
                <span className="header__optionLineTwo">Basket</span>
              </div>
            </Link>
          </>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <button
            onClick={() => setSidebarIsOpen(false)}
            id="close-sidebar-btn"
            className="close-sidebar"
            type="button"
          >
            <i className="fa fa-times"></i>
          </button>
          <ul className="categories">
            <li className="header">
              <Link to="/profile" id="sidebar-user">
                <i className="fa fa-user-circle" aria-hidden="true"></i> Hello,
                {" " + getShortenName(userInfo, 14)}
              </Link>
            </li>
            <li>
              <strong>Trending</strong>
            </li>
            <li>
              <Link
                to="/search/category/all"
                onClick={() => setSidebarIsOpen(false)}
              >
                View All
              </Link>
            </li>
            <li>
              <Link to="/" onClick={() => setSidebarIsOpen(false)}>
                Top Sellers
              </Link>
            </li>
            <div className="trend-line"></div>
            <li>
              <strong>Categories</strong>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
            <div className="trend-line"></div>
            <li>
              <strong>Help & Setting</strong>
            </li>
            <li>
              <Link to="/profile" onClick={() => setSidebarIsOpen(false)}>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/shipping" onClick={() => setSidebarIsOpen(false)}>
                Shipping Address
              </Link>
            </li>
            <li>
              <Link to="/orderhistory" onClick={() => setSidebarIsOpen(false)}>
                Orders & Returns
              </Link>
            </li>
            <li>
              <Link
                to="/customer-service"
                onClick={() => setSidebarIsOpen(false)}
              >
                FAQ & Customer Service
              </Link>
            </li>
            <div className="trend-line"></div>
            <li>
              <strong>Account</strong>
            </li>
            <li>
              {userInfo ? (
                <Link
                  to="#signout"
                  onClick={() => {
                    setSidebarIsOpen(false);
                    signoutHandler();
                  }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link to="/signin" onClick={() => setSidebarIsOpen(false)}>
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <a href="https://ntien.com" target="_blank">
                Contact ntien.com
              </a>
            </li>
          </ul>
        </aside>
        <label
          className={sidebarIsOpen ? "click-catcher" : ""}
          htmlFor="close-sidebar-btn"
        ></label>
        <main>
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
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
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
            path="/orderhistory"
            component={OrderHistoryScreen}
          ></PrivateRoute>
          <PrivateRoute
            path="/profile/seller"
            component={ProfileScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
            exact
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
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
