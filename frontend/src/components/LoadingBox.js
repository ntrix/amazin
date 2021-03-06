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
        <div class="sprite__loading--xl">
          <br />
          <b>Loading..</b>
        </div>
      )}
    </div>
  );
}
