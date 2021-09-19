export * from './storage';
export * from './currencyPipe';
export * from './savePath';
export * from './sourceAdapter';
export * from './getImgUrl';
export * from './dummyListsCreator';
export * from './debounce';
export * from './throttle';
export * from './shortName';
export * from './findSuggest';

export const castArray = (strArray: unknown) => (Array.isArray(strArray) ? strArray : [strArray]);

/* create unique #id for .css combined to label or js */
export const createId = (text: string | undefined) => text?.split(' ').join('-').toLowerCase();
