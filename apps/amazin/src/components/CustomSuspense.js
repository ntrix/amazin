import { Suspense } from 'react';
import { bannerFallback, ProductCardFallback, productListFallback } from './Fallbacks';
import LoadingBox from './LoadingBox';

export const delay = (time) => (promiseResult) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

export function SuspenseLoad(props) {
  return <Suspense fallback={<LoadingBox />} {...props} />;
}

export function SuspenseBanner(props) {
  return <Suspense fallback={bannerFallback} {...props} />;
}

export function SuspenseSeller(props) {
  return <Suspense fallback={<h4>Seller</h4>} {...props} />;
}

export function SuspenseText(props) {
  return <Suspense fallback={<h3>Amazin' Amazim. Loading...</h3>} {...props} />;
}

export function SuspenseNull(props) {
  return <Suspense fallback={null} {...props} />;
}

export const SusProductCard = ({ children }) => <Suspense fallback={<ProductCardFallback />}>{children}</Suspense>;

export const SusProductList = ({ children }) => <Suspense fallback={productListFallback}>{children}</Suspense>;

export { Suspense };
