import { memo } from 'react';

function LoadingBox({ hide = false, xl = false, wrapClass = '' }) {
  if (hide) return null;

  const innerComponent = () => (
    <div className="loading">
      {xl ? <b>Loading ..</b> : <>Loading ..</>}
      <div className={`sprite__loading${xl ? '--xl' : ''}`} />
    </div>
  );
  return !wrapClass ? innerComponent() : <div className={wrapClass}>{innerComponent()}</div>;
}

export default memo(LoadingBox);
