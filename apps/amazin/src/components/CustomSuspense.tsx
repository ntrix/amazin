import { Suspense } from 'react';
import { bannerFallback, ProductCardFallback, productListFallback } from './Fallbacks';

export const delay = (time: number) => (promiseResult: unknown) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

export function SuspenseLoad(props: Props) {
  return (
    <Suspense
      fallback={
        <>
          Loading.. <span className="sprite__loading" />
        </>
      }
      {...props}
    />
  );
}

export function SuspenseBanner(props: Props) {
  return <Suspense fallback={bannerFallback} {...props} />;
}

export function SuspenseText({ text = "Amazin' Amazim. Loading...", children }: { text?: string; children: Children }) {
  return <Suspense fallback={<h3>{text}</h3>}>{children}</Suspense>;
}

export function SuspenseNull(props: Props) {
  return <Suspense fallback={null} {...props} />;
}

export const SusProductCard = ({ children }: { children: Children }) => (
  <Suspense fallback={<ProductCardFallback />}>{children}</Suspense>
);

export const SusProductList = ({ children }: { children: Children }) => (
  <div className="row center">
    <Suspense fallback={productListFallback}>{children}</Suspense>
  </div>
);

export { Suspense };
