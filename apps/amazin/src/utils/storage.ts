import { KEY } from 'src/constants';

/* Proxy for localStorage and Redux, mostly used for local storage */
export const Storage = new Proxy(KEY, {
  get(obj, key) {
    try {
      return JSON.parse(localStorage.getItem(String(key)) ?? '');
    } catch (e) {
      return localStorage.getItem(String(key)) ?? '';
    }
  },
  set(obj, key, value: StorageType) {
    if (value === '') localStorage.removeItem(String(key));
    else localStorage.setItem(String(key), JSON.stringify(value));
    return true;
  }
});
