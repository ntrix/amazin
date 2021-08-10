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
      throw new Error('This is not an error');
    }
  };
}

function mapStateToAPI(state, payload = state) {
  return {
    read() {
      if (state === 'loading') throw payload.loading;
      if (state === 'error') throw payload.error;
      if (state === 'success') return payload.success;
      throw new Error('This is not an error');
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
  mapStateToAPI,
  preloadImage,
  LazyBackground,
  LazyImg
};
