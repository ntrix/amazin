import { Suspense } from 'react';
import { bannerFallback, ProductCardFallback, productListFallback } from './Fallbacks';

export const delay = (time: number) => (promiseResult: unknown) =>
  new Promise((resolve) => setTimeout(() => resolve(promiseResult), time));

export function SuspenseLoad({ children }: { children: Children }) {
  return (
    <Suspense
      fallback={
        <>
          Loading.. <span className="sprite__loading" />
        </>
      }
    >
      {children}
    </Suspense>
  );
}

export function SuspenseBanner({ children }: { children: Children }) {
  return <Suspense fallback={bannerFallback}>{children}</Suspense>;
}

export function SuspenseText({ text = "Amazin' Amazim. Loading...", children }: { text?: string; children: Children }) {
  return <Suspense fallback={<h3>{text}</h3>}>{children}</Suspense>;
}

export function SuspenseNull({ children }: { children: Children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
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
