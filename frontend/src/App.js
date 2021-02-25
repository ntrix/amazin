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
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="header__nav brand" to="/">
              <img className="logo" src={Logo} alt="logo" />
              <span>mazin'</span>
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
                    Hello {userInfo.name}
                  </span>
                  <span className="header__optionLineTwo">
                    Account & Lists <i className="fa fa-caret-down"></i>{" "}
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
                    <Link to="/">Returns</Link>
                  </li>
                  <div className="trend-line"></div>
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
                  <span className="header__optionLineOne">Hello, sign in</span>
                  <span className="header__optionLineTwo">
                    Account & Lists <i className="fa fa-caret-down"></i>{" "}
                  </span>
                </div>
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <div className="trend-line"></div>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
            <div className="header__nav header__option">
              <span className="header__optionLineOne disabled">Return</span>
              <span className="header__optionLineTwo disabled">& Orders</span>
            </div>
            <Link to="/cart" className="header__nav basket">
              <div className="header__option">
                <span className="header__optionLineOne header__basketCount">
                  {cartItems.length}
                </span>
                <span className="header__optionLineTwo header__basket">
                  <img className="cart" src={Cart} alt="Basket"></img>
                </span>
              </div>
              <div className="header__option">
                <span className="header__optionLineOne">Shopping</span>
                <span className="header__optionLineTwo">Basket</span>
              </div>
            </Link>
          </>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
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
          </ul>
        </aside>
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
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
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
            path="/profile"
            component={ProfileScreen}
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
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
