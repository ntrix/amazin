import { cloneElement, useEffect, useRef, useState } from 'react';

import { SHOW_ERROR_TIMEOUT } from '../constants';
import LoadingBox from './LoadingBox';
import MessageBox, { MessageBoxProps } from './MessageBox';

export type LoadingOrErrorProps = Omit<MessageBoxProps, 'show'> & {
  statusOf: StatusType;
  xl?: boolean;
};

function InnerBox({ statusOf = {}, msg = '', xl = false, variant, children, ...rest }: LoadingOrErrorProps) {
  const { loading = false, error } = statusOf;

  if (loading) return <LoadingBox xl={xl} />;
  if (error) return <MessageBox msg={msg || error} variant={variant ?? 'danger'} />;
  return children ? cloneElement(children, Object.assign(children.props, rest)) : null;
}

function LoadingOrError({ statusOf, wrapClass = '', children, ...rest }: LoadingOrErrorProps) {
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

  if (hideError) return <> </>;
  if (!wrapClass || !children) return <InnerBox {...props} />;

  return (
    <div className={wrapClass}>
      <InnerBox {...props} />
    </div>
  );
}
export default LoadingOrError;
