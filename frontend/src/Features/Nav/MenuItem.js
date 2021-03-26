import React from "react";
import { Link } from "react-router-dom";

export const MenuItem = (setShadowFor) => (
  [label, linkTo, className, extraAction],
  id
) => {
  const innerComponent = () => {
    if (!linkTo && !className) return <strong>{label}</strong>;

    if (linkTo == "disabled")
      return (
        <Link to="#" className="disabled">
          {label}
        </Link>
      );

    if (linkTo.startsWith("https://"))
      //a href instead of Link for extern links
      return (
        <a href={linkTo} target="_blank">
          {label}
        </a>
      );

    if (linkTo)
      return (
        <Link
          to={linkTo}
          className={className}
          onClick={(e) => {
            e.stopPropagation();
            setShadowFor("");
            if (extraAction) extraAction();
          }}
        >
          {label}
        </Link>
      );

    return <div>{label}</div>;
  };
  return label == "separator" ? (
    <div key={id} className="separator"></div>
  ) : (
    <li key={id}>{innerComponent()}</li>
  );
};
