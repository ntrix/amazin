import React, { useEffect, useRef, useState } from 'react';

import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { SHOW_ERROR_TIMEOUT } from '../constants';

export function _LoadingOrError({
  statusOf: { loading = false, error = false },
  wrapClass = '',
  errorMsg = '',
  xl = false,
  variant = 'danger',
  children,
  ...rest
}) {
  const [hideError, setHideError] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (error) {
      setHideError(false);
      timeoutId.current = setTimeout(() => {
        setHideError(true);
      }, SHOW_ERROR_TIMEOUT);
    }
    return () => clearTimeout(timeoutId.current);
  }, [error]);

  const innerComponent = () => {
    if (loading) return <LoadingBox xl={xl} />;
    return error && !hideError ? (
      <MessageBox msg={errorMsg || error} variant={variant} />
    ) : (
      !!children &&
        React.cloneElement(children, Object.assign(children.props, rest))
    );
  };

  return !wrapClass || !children ? (
    innerComponent()
  ) : (
    <div className={wrapClass}>{innerComponent()}</div>
  );
}

const LoadingOrError = React.memo(_LoadingOrError);
export default LoadingOrError;
