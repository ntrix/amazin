import { memo, cloneElement, useEffect, useRef, useState } from 'react';

import { SHOW_ERROR_TIMEOUT } from '../constants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

function InnerBox({ statusOf, errorMsg = '', xl = false, variant, children, ...rest }) {
  const { loading = false, error = false } = statusOf;

  if (loading) return <LoadingBox xl={xl} />;
  if (error) return <MessageBox msg={errorMsg || error} variant={variant ?? 'danger'} />;
  return children ? cloneElement(children, Object.assign(children.props, rest)) : null;
}

function LoadingOrError({ wrapClass = '', ...props }) {
  const [hideError, setHideError] = useState(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    if (props.statusOf?.error) {
      setHideError(false);
      timeoutId.current = setTimeout(() => setHideError(true), SHOW_ERROR_TIMEOUT);
    }
    return () => clearTimeout(timeoutId.current);
  }, [props.statusOf.error]);

  if (hideError) return null;
  if (!wrapClass || !props.children) return <InnerBox {...props} />;
  return <div className={wrapClass} children={<InnerBox {...props} />} />;
}
export default memo(LoadingOrError);
