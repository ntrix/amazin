import { memo, cloneElement, useEffect, useRef, useState } from 'react';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { SHOW_ERROR_TIMEOUT } from '../constants';

function LoadingOrError({ statusOf, wrapClass = '', errorMsg = '', xl = false, variant, children, ...rest }) {
  const { loading = false, error = false } = statusOf;
  const [hideError, setHideError] = useState(false);
  const timeoutId = useRef(null);
  useEffect(() => {
    if (error) {
      setHideError(false);
      timeoutId.current = setTimeout(() => setHideError(true), SHOW_ERROR_TIMEOUT);
    }
    return () => clearTimeout(timeoutId.current);
  }, [error]);
  const innerComponent = () => {
    if (loading) return <LoadingBox xl={xl} />;
    if (error && !hideError) return <MessageBox msg={errorMsg || error} variant={variant ?? 'danger'} />;
    return children ? cloneElement(children, Object.assign(children.props, rest)) : null;
  };
  return !wrapClass || !children ? innerComponent() : <div className={wrapClass}>{innerComponent()}</div>;
}
export default memo(LoadingOrError);
