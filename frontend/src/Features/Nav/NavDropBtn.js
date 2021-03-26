import React from "react";

export default function NavDropBtn({
  label = "",
  className = "",
  onEnterHandle,
  onLeaveHandle,
  children,
}) {
  const line = label.split("^");
  return (
    <div
      className={"dropdown " + className}
      onMouseEnter={onEnterHandle}
      onClick={onEnterHandle}
      onMouseLeave={onLeaveHandle}
    >
      <div>
        <div className="nav__line-1">{line[0]}</div>
        <div className="nav__line-2">
          {line[1]}
          <span className="tablet--off">{line[2]}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
      {children}
    </div>
  );
}
