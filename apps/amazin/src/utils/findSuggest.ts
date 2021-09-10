const OPEN_TAG = '<b>';
const CLOSE_TAG = '</b>';

// eslint-disable-next-line
const escapeC = (s) => s.replace(/[\-#$\^*()+\[\]{}|\\,\'\"\&.?\s]/g, '\\$&');
const EMPTY_GROUP = new RegExp(escapeC(CLOSE_TAG + OPEN_TAG), 'g');
const GROUP = new RegExp(`(${escapeC(OPEN_TAG)}[\\s\\S]+?${escapeC(CLOSE_TAG)})`, 'g');

function getPriority(string, word) {
  let priority = 0;
  word = OPEN_TAG + word + CLOSE_TAG;

  string.replace(GROUP, (found) => {
    priority = word === found ? 999 : Math.max(found.length, priority);
  });

  return priority;
}

/* find suggestions util. for NavSearch's dropdown suggest list */
export function findSuggest(list, keyword) {
  if (!list || !keyword) return [];

  keyword = keyword.slice(0, 49);
  const splittedKeys = keyword.split('');

  const convertedKey = splittedKeys.reduce((acc, char) => `${acc}(${escapeC(char)})(.*?)`, '(.*?)');
  const regKey = new RegExp(convertedKey, 'i');

  const replacer = splittedKeys.reduce((acc, _, i) => `${acc}${OPEN_TAG}$${i * 2 + 2}${CLOSE_TAG}$${i * 2 + 3}`, '$1');

  const cleanUp = (name) => name.replace(regKey, replacer).replace(EMPTY_GROUP, '');
  const result = list.reduce(
    (acc, { _id, name }) => (regKey.test(name) ? acc.concat({ _id, name: cleanUp(name) }) : acc),
    []
  );

  return result.sort((a, b) => getPriority(b.name, keyword) - getPriority(a.name, keyword));
}
