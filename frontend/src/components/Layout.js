import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

export default function Layout({
  isLoading = false,
  xl = false,
  hasError = false,
  errorMsg = "",
  variant = "danger",
  children,
  ...rest
}) {
  if (isLoading) return <LoadingBox xl={xl} />;
  if (hasError)
    return <MessageBox show msg={errorMsg || hasError} variant={variant} />;
  children.props = rest;
  return <>{children}</>;
}
