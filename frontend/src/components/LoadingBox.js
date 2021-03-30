import React from "react";

export default function LoadingBox({ xl }) {
  return (
    <div className="loading">
      {xl ? (
        <>
          <b>Loading..</b>
          <div className="sprite__loading--xl"></div>
        </>
      ) : (
        <>
          Loading..
          <div className="sprite__loading"></div>
        </>
      )}
    </div>
  );
}
