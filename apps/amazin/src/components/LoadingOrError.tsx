import { memo, cloneElement, useEffect, useRef, useState } from 'react';

import { SHOW_ERROR_TIMEOUT } from '../constants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

type InnerPropType = {
  statusOf: StatusType;
  errorMsg?: string;
  xl?: boolean;
  variant?: string;
  children?: Children;
  rest?: Props;
};

function InnerBox({ statusOf = {}, errorMsg = '', xl = false, variant, children, ...rest }: InnerPropType) {
  const { loading = false, error } = statusOf;

  if (loading) return <LoadingBox xl={xl} />;
  if (error) return <MessageBox msg={errorMsg || error} variant={variant ?? 'danger'} />;
  return children ? cloneElement(children, Object.assign(children.props, rest)) : null;
}

type PropType = {
  statusOf: StatusType;
  wrapClass?: string;
  children?: Children;
  rest?: Props;
  xl?: boolean;
};

function LoadingOrError({ statusOf, wrapClass = '', children, ...rest }: PropType) {
  const [hideError, setHideError] = useState(false);
  const timeoutId = useRef(0);
  const props = { statusOf, children, ...rest };

  useEffect(() => {
    if (statusOf?.error) {
      setHideError(false);
      timeoutId.current = window.setTimeout(() => setHideError(true), SHOW_ERROR_TIMEOUT);
    }
    return () => clearTimeout(timeoutId.current);
  }, [statusOf?.error]);

  if (hideError) return <>0</>;
  if (!wrapClass || !children) return <InnerBox {...props} />;

  return (
    <div className={wrapClass}>
      <InnerBox {...props} />
    </div>
  );
}
export default LoadingOrError;
