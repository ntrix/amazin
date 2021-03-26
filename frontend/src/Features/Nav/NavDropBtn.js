import React from "react";

export default function NavDropBtn({
  label = "",
  className = "",
  className1 = "",
  className2 = "",
  className3 = "",
  onEnterHandle,
  onLeaveHandle,
  children,
}) {
  const line = label.split("^");
  return (
    <div
      className={"dropdown " + className}
      onMouseEnter={onEnterHandle}
      // UX behavior: a touch on mobile device acts as hover
      onClick={onEnterHandle}
      onMouseLeave={onLeaveHandle}
    >
      <div>
        <div className={className1 + " nav__line-1"}>{line[0]}</div>
        <div className={className2 + " nav__line-2"}>
          {line[1]}
          <span className={className3 || "tablet--off"}>{line[2]}</span>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>
      {children}
    </div>
  );
}
