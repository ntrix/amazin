/* find suggestions util. for NavSearch's dropdown suggest list */
export const findSuggest = (() => {
  const openTag = '<b>';
  const closeTag = '</b>';
  // eslint-disable-next-line
  const escapeC = (s) => s.replace(/[\-#$\^*()+\[\]{}|\\,\'\"\&.?\s]/g, '\\$&');

  const combinePhrases = new RegExp(escapeC(closeTag + openTag), 'g');

  const group = new RegExp(`(${escapeC(openTag)}[\\s\\S]+?${escapeC(closeTag)})`, 'g');

  const findPriority = (string, word) => {
    let prior = 0;
    word = openTag + word + closeTag;
    string.replace(group, (found) => {
      prior = word === found ? 999 : Math.max(found.length, prior);
    });
    return prior;
  };

  return {
    search(list, keyword) {
      if (!list || !keyword) return [];

      keyword = keyword.slice(0, 49);
      const splittedKeys = keyword.split('');

      const convertedKey = splittedKeys.reduce((acc, char) => `${acc}(${escapeC(char)})(.*?)`, '(.*?)');
      const regKey = new RegExp(convertedKey, 'i');

      const replacer = splittedKeys.reduce(
        (acc, _, i) => `${acc}${openTag}$${i * 2 + 2}${closeTag}$${i * 2 + 3}`,
        '$1'
      );

      const result = list.reduce(
        (acc, item) =>
          regKey.test(item.name)
            ? acc.concat({
                name: item.name.replace(regKey, replacer).replace(combinePhrases, ''),
                _id: item._id
              })
            : acc,
        []
      );

      return result.sort((a, b) => findPriority(b.name, keyword) - findPriority(a.name, keyword));
    }
  };
})();
