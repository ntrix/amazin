import React from "react";

export default function MessageBox({ variant, children }) {
  return (
    <div className={`alert alert--${variant || "info"}`}>
      {!Array.isArray(children) ? (
        children
      ) : (
        <ul>
          {children.map((child, id) => (
            <li key={id}>{child}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
