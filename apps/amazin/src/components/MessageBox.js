import React from "react";

export default function MessageBox({
  show = false,
  msg,
  variant,
  wrapClass = "",
  children,
}) {
  if (!show && !msg?.length) return null;

  const infos = msg || children;

  const innerComponent = () => (
    <div className={`alert alert--${variant || "info"}`}>
      {Array.isArray(infos) ? (
        <ul>
          {infos.map((info, id) => (
            <li key={id}>{info}</li>
          ))}
        </ul>
      ) : (
        infos
      )}
    </div>
  );

  return !wrapClass ? (
    innerComponent()
  ) : (
    <div className={wrapClass}>{innerComponent()}</div>
  );
}
