import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signout } from "../../Controllers/userActions";
import SearchBox from "../../components/SearchBox";
import {
  adminMenuItems,
  noUserMenuItems,
  sellerMenuItems,
  userMenuItems,
} from "./menuItemList";
import DropMenuCurrency from "./DropMenuCurrency";
import { MenuItem } from "./MenuItem";
import NavDropBtn from "./NavDropBtn";
import { savePath, shortName } from "../../utils";
import Logo from "../../img/a.svg";
import "./nav.css";

export default function HeaderNav({ shadowFor, setShadowFor, currency }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();

  const timeoutId = useRef(0);
  const onEnterHandle = () => {
    clearTimeout(timeoutId.current - 99);
    timeoutId.current = setTimeout(() => setShadowFor("navDrop"), 450);
  };
  const onLeaveHandle = () => {
    timeoutId.current = 99 + setTimeout(() => setShadowFor(""), 450);
  };

  const DropMenu = ({ menuItems }) => (
    <ul className={"dropdown__menu" + ("navDrop" === shadowFor ? " show" : "")}>
      {menuItems.map(MenuItem(setShadowFor))}
    </ul>
  );

  return (
    <>
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

        <NavDropBtn
          className="nav__currency mobile--off"
          className2="sprite__wrapper"
          className3={"sprite flag " + currency}
          onEnterHandle={() => setShadowFor("currency")}
          onLeaveHandle={() => setShadowFor("")}
        >
          <DropMenuCurrency currency={currency} />
        </NavDropBtn>

        {!userInfo && (
          <NavDropBtn
            label="Hello, Sign in^Account^ & Lists"
            className="nav__user"
            onEnterHandle={onEnterHandle}
            onLeaveHandle={onLeaveHandle}
          >
            <DropMenu menuItems={noUserMenuItems()} />
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
              menuItems={userMenuItems(userInfo, () => dispatch(signout()))}
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
            <DropMenu menuItems={sellerMenuItems(userInfo)} />
          </NavDropBtn>
        )}

        {userInfo?.isAdmin && (
          <NavDropBtn
            label="Admin^Tools"
            className="nav__admin phone--off"
            onEnterHandle={onEnterHandle}
            onLeaveHandle={onLeaveHandle}
          >
            <DropMenu menuItems={adminMenuItems()} />
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
    </>
  );
}
