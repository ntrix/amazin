import { CSSProperties } from 'react';
import { NO_IMAGE } from '../constants';

function createSuspenseAPI<Promise>(promise: PromiseLike<string>) {
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

function subscribeResource(state: AppState) {
  return {
    read(props: unknown) {
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

const sCached = {};

type PropType = {
  src?: string;
  style: CSSProperties | undefined;
  alt?: string | undefined;
  placeholder?: string | undefined;
};

function LazyComponent(as: string) {
  return ({ src = NO_IMAGE, ...props }: PropType) => {
    if (!sCached[src]) sCached[src] = createSuspenseAPI(preloadImage(src));

    return as === 'img' ? (
      <img src={sCached[src]?.read() || src} alt={props.alt} {...props} />
    ) : (
      <div
        {...props}
        style={{
          ...props.style,
          backgroundImage: `url(${sCached[src].read() || props.placeholder})`
        }}
      />
    );
  };
}

const LazyImg = LazyComponent('img');
const LazyBackground = LazyComponent('div');

export { createSuspenseAPI, subscribeResource, preloadImage, LazyBackground, LazyImg };
