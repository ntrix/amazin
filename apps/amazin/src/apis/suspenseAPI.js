import { NO_IMAGE } from '../constants';

function createSuspenseAPI(promise) {
  let state = 'loading';
  let result = promise.then(
    (resolved) => {
      state = 'success';
      result = resolved;
    },
    (rejected) => {
      state = 'error';
      result = rejected;
    }
  );

  return {
    read() {
      if (state === 'success') return result;
      throw result;
    }
  };
}

function subscribeResource(state) {
  return {
    read(prop) {
      if (state.loading) throw new Promise();
      if (state.error) throw state.error;
      return state[prop] || prop;
    }
  };
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.src = src;
    img.onload = () => resolve(src);
  });
}

const sCached = {};

function LazyComponent(tag) {
  return ({ src, ...props }) => {
    if (!src) src = NO_IMAGE;
    if (!sCached[src]) sCached[src] = createSuspenseAPI(preloadImage(src));
    return tag === 'img' ? (
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
