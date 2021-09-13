import { memo } from 'react';

function LoadingBox({ hide = false, xl = false, wrapClass = '' }) {
  if (hide) return null;
  const Loader = xl ? <b>Loading ..</b> : <>Loading ..</>;
  const mode = 'sprite__loading' + (xl ? '--xl' : '');
  const innerComponent = () => (
    <div className="loading">
      {Loader}
      <div className={mode} />
    </div>
  );

  return !wrapClass ? innerComponent() : <div className={wrapClass}>{innerComponent()}</div>;
}

export default memo(LoadingBox);
