import React from "react";

export default function LoadingBox({ size = "" }) {
  return (
    <div className="loading">
      {!size && (
        <>
          Loading..
          <div class="sprite__loading"></div>
        </>
      )}
      {size && (
        <>
          <b>Loading..</b>
          <div class="sprite__loading--xl"></div>
        </>
      )}
    </div>
  );
}
