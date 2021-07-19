import React from 'react';

export function _LoadingBox({ hide = false, xl = false, wrapClass = '' }) {
  if (hide) return null;

  const innerComponent = () => (
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

  return !wrapClass ? (
    innerComponent()
  ) : (
    <div className={wrapClass}>{innerComponent()}</div>
  );
}

const LoadingBox = React.memo(_LoadingBox);
export default LoadingBox;
