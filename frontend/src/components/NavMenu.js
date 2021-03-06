import React from "react";
import { Link } from "react-router-dom";

export const addMenuItem = (clickHandle) => ([
  menuItemLabel,
  linkTo,
  className,
  extraFunction,
]) => {
  if (menuItemLabel == "separator") return <div className="separator"></div>;
  const innerComponent = () =>
    !linkTo && !className ? (
      <strong>{menuItemLabel}</strong>
    ) : linkTo == "disabled" ? (
      <Link className="disabled">{menuItemLabel}</Link>
    ) : linkTo.startsWith("https://") ? (
      <a href={linkTo} target="_blank">
        {menuItemLabel}
      </a>
    ) : linkTo ? (
      <Link
        to={linkTo}
        className={className}
        onClick={() => {
          clickHandle(false);
          if (extraFunction) extraFunction();
        }}
      >
        {menuItemLabel}
      </Link>
    ) : (
      <div>{menuItemLabel}</div>
    );
  return <li key={menuItemLabel}>{innerComponent()}</li>;
};

export default function NavDropMenu({
  label = "",
  attr = "",
  onEnterHandle,
  onLeaveHandle,
  isDropped = false,
  dropMenu = [],
  onClickItem = null,
}) {
  const line = label.split("^");
  return (
    <div
      className={"dropdown " + attr}
      onMouseEnter={onEnterHandle}
      onMouseLeave={onLeaveHandle}
    >
      <div>
        <div className="nav__line-1">{line[0]}</div>
        <div className="nav__line-2">
          {line[1]}
          <span className="tablet--off">{line[2]}</span>
          {dropMenu && <i className="fa fa-caret-down"></i>}
        </div>
      </div>
      {dropMenu && (
        <ul className={"dropdown__menu" + (isDropped ? " show" : "")}>
          {dropMenu.map(addMenuItem(onClickItem))}
        </ul>
      )}
    </div>
  );
}