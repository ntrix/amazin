import { CSSProperties } from 'react';
import { NO_IMAGE } from '../constants';

function createSuspenseAPI(promise: PromiseLike<string>) {
  let status = 'loading';
  let result: string | PromiseLike<string | void> = promise.then(
    (resolved) => {
      status = 'success';
      result = resolved;
    },
    (rejected) => {
      status = 'error';
      result = rejected;
    }
  );

  return {
    read() {
      if (status === 'success') return result;
      throw result;
    }
  };
}

function subscribeResource(state: AppState & StatusType) {
  return {
    read(props: keyof AppState) {
      if (state.loading) throw new Promise(() => void 0);
      if (state.error) throw state.error;
      return state[props] || props;
    }
  };
}

function preloadImage(src: string) {
  return new Promise<string>((resolve) => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => resolve(src);
  });
}

const sCached: CacheType = {};

type PropType = {
  src?: string;
  style?: CSSProperties;
  alt?: string;
  placeholder?: string;
  className?: string;
  children?: Children;
  rest?: RestProps;
  onMouseEnter?: FnType;
  onClick?: FnType;
};

function LazyComponent(as: string) {
  return ({ src = NO_IMAGE, children, ...rest }: PropType) => {
    if (!sCached[src]) sCached[src] = createSuspenseAPI(preloadImage(src));

    return as === 'img' ? (
      <img src={sCached[src]?.read() || src} alt={rest.alt} {...rest} />
    ) : (
      <div
        {...rest}
        style={{
          ...rest.style,
          backgroundImage: `url(${sCached[src].read() || rest.placeholder})`
        }}
      >
        {children}
      </div>
    );
  };
}

const LazyImg = LazyComponent('img');
const LazyBackground = LazyComponent('div');

export { createSuspenseAPI, subscribeResource, preloadImage, LazyBackground, LazyImg };
