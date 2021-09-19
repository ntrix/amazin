import { KEY } from 'src/constants';
import { Storage } from '.';

/* save current path to localStorage, no need to save path on the same screen */
export const savePath =
  (exceptionStartWith = '@') =>
  () => {
    if (!window.location.pathname.startsWith(exceptionStartWith)) Storage[KEY.HISTORY] = window.location.pathname;
  };
