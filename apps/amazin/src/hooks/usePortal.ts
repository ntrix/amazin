import { useRef, useEffect } from 'react';

function createParent(id: string) {
  const parent = document.createElement('div');
  parent.setAttribute('id', id);
  return parent;
}

function addRootElement(rootElement: Element) {
  if (document.body.lastElementChild)
    document.body.insertBefore(rootElement, document.body.lastElementChild.nextElementSibling);
}

function usePortal(id: string) {
  const parentRef = useRef<Ref<Element>>(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElement = existingParent || createParent(id);

    if (!existingParent) addRootElement(parentElement);

    parentElement.appendChild(parentRef.current);

    return () => {
      parentRef.current.remove();
      if (!parentElement.childElementCount) parentElement.remove();
    };
  }, [id]);

  const getRootElement = () => (parentRef.current = parentRef.current || document.createElement('div'));

  return getRootElement();
}

export default usePortal;
