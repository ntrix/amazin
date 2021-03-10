import React from "react";

export default function LoadingBox({ size = "" }) {
  return (
    <div className="loading">
      {!size && (
        <>
          Loading..
          <div className="sprite__loading"></div>
        </>
      )}
      {size && (
        <>
          <b>Loading..</b>
          <div className="sprite__loading--xl"></div>
        </>
      )}
    </div>
  );
}
