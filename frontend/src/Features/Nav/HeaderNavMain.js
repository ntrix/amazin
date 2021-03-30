import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

export default function HeaderNavMain({ setShadowFor }) {
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

  return (
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
  );
}
