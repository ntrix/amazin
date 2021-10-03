const OPEN_TAG = '<b>';
const CLOSE_TAG = '</b>';

// eslint-disable-next-line
const escapeC = (s: string) => s.replace(/[\-#$\^*()+\[\]{}|\\,\'\"\&.?\s]/g, '\\$&');
const EMPTY_GROUP = new RegExp(escapeC(CLOSE_TAG + OPEN_TAG), 'g');
const GROUP = new RegExp(`(${escapeC(OPEN_TAG)}[\\s\\S]+?${escapeC(CLOSE_TAG)})`, 'g');

function getPriority(str: string, word: string) {
  let priority = 0;
  word = OPEN_TAG + word + CLOSE_TAG;

  str.replace(GROUP, (subStr) => {
    priority = word === subStr ? 999 : Math.max(subStr.length, priority);
    return subStr;
  });

  return priority;
}

type PType = { name: string };
/* find suggestions util. for NavSearch's dropdown suggest productList */
export function findSuggest(productList: PType[], keyword: string) {
  if (!productList || !keyword) return [];

  keyword = keyword.slice(0, 49);
  const splittedKeys = keyword.split('');

  const convertedKey = splittedKeys.reduce((acc, char) => `${acc}(${escapeC(char)})(.*?)`, '(.*?)');
  const regKey = new RegExp(convertedKey, 'i');

  const replacer = splittedKeys.reduce((acc, _, i) => `${acc}${OPEN_TAG}$${i * 2 + 2}${CLOSE_TAG}$${i * 2 + 3}`, '$1');

  const cleanUp = (name: string) => name.replace(regKey, replacer).replace(EMPTY_GROUP, '');
  const result = productList.reduce(
    (acc: PType[], { name }: PType) => (regKey.test(name) ? acc.concat({ name: cleanUp(name) }) : acc),
    []
  );

  return result.sort((a, b) => getPriority(b.name, keyword) - getPriority(a.name, keyword));
}
