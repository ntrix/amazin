import React from 'react';

function createResource(promise) {
  let status = 'pending';
  let result = promise.then(
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
      if (status === 'pending') throw result;
      if (status === 'error') throw result;
      if (status === 'success') return result;
      throw new Error('This should be impossible');
    }
  };
}

function getResource(statusOf, payload = statusOf) {
  return {
    read() {
      if (statusOf === 'pending') throw payload.loading;
      if (statusOf === 'error') throw payload.error;
      if (statusOf === 'success') return payload.success;
      throw new Error('This should be impossible');
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

const imgSrcResourceCache = {};

function Img({ src, alt, ...props }) {
  let imgSrcResource = imgSrcResourceCache[src];
  if (!imgSrcResource) {
    imgSrcResource = createResource(preloadImage(src));
    imgSrcResourceCache[src] = imgSrcResource;
  }
  return <img src={imgSrcResource.read()} alt={alt} {...props} />;
}

function Section({ style, children, ...props }) {
  const { backgroundImage: src } = style;
  let imgSrcResource = imgSrcResourceCache[src];
  if (!imgSrcResource) {
    imgSrcResource = createResource(preloadImage(src));
    imgSrcResourceCache[src] = imgSrcResource;
  }
  style.backgroundImage = imgSrcResource.read();
  return (
    <section style={style} {...props}>
      {children}
    </section>
  );
}

export default Img;
export { createResource, getResource, preloadImage, Section };
