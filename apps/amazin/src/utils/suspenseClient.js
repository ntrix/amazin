import React from 'react';

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
      if (state === 'loading') throw result;
      if (state === 'error') throw result;
      if (state === 'success') return result;
      throw new Error('No error');
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
    if (!sCached[src]) sCached[src] = createSuspenseAPI(preloadImage(src));
    return tag === 'img' ? (
      <img src={sCached[src].read()} alt={props.alt} {...props} />
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

export {
  createSuspenseAPI,
  subscribeResource,
  preloadImage,
  LazyBackground,
  LazyImg
};
