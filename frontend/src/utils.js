import { CURRENCY } from "./constants";
/* singleton for currency and all its pipes, rates, calculations */
export const pipe = {
  currency: "EUR",
  currencies: ["EUR", "GBP", "USD", "PLN", "CZK", "CHF"],
  rates: {
    //default dummy rate
    EUR: 1,
    USD: 1.2,
    GBP: 0.9,
    CZK: 27,
    PLN: 5,
    CHF: 1.1,
  },
  setCurrency(currency) {
    this.currency = currency;
  },
  updateRates(newRates) {
    if (newRates?.length)
      this.currencies.map((c) => (this.rates[c] = newRates[c]));
  },
  getSymbol(currency = this.currency) {
    return {
      GBP: "£",
      USD: "$",
      PLN: "zł",
      CZK: "Kč",
      CHF: "CHf",
      EUR: "€",
    }[currency];
  },
  getName(currency) {
    return {
      GBP: "GB Pounds",
      USD: "US Dollar",
      PLN: "Polish Zloty",
      CZK: "Czech Koruna",
      CHF: "Swiss France",
      EUR: "Euro (Default)",
    }[currency || this.currency];
  },
  getRate(currency) {
    return this.rates[currency || this.currency] || 1;
  },
  getPrice(price = 0, rate = this.getRate()) {
    return (price * rate).toFixed(CURRENCY);
  },
  getNote(price = 0, rate = this.getRate()) {
    return ((price * rate) | 0).toString();
  },
  getCent(price = 0, rate = this.getRate()) {
    return (price * rate).toFixed(CURRENCY).slice(-CURRENCY);
  },
  showPrice(price) {
    return `${this.getSymbol()} ${this.getPrice(price)}`;
  },
};

/* save current path to localStorage, no need to save path on the same screen */
export const savePath = (exceptionStartWith = "@") => () => {
  if (!window.location.pathname.startsWith(exceptionStartWith))
    localStorage.setItem("backToHistory", window.location.pathname);
};

/* adapter pattern (or create placeholders if not exists) for video movies source from 3rd party API */
export const sourceAdapter = (movies) =>
  movies?.map((m) => ({
    name:
      m.name || m.title || m.original_title || m.original_name || "Movie Name",
    image:
      m.image || [baseURL + m.poster_path, baseURL + m.backdrop_path].join("^"),
    rating: m.rating || m.vote_average / 2 || 0,
    numReviews: m.numReviews || m.vote_count || 0,
    description: m.description || m.overview || "",
    video: m.video,
    seller: m.seller,
    _id: m._id,
  }));

/* find suggestions util. for searchBox's dropdown suggest list */
export const findSuggest = (() => {
  const openTag = "<b>";
  const closeTag = "</b>";
  // eslint-disable-next-line
  const escapeC = (s) => s.replace(/[\-#$\^*()+\[\]{}|\\,\'\"\&.?\s]/g, "\\$&");

  const combinePhrases = new RegExp(escapeC(closeTag + openTag), "g");

  const group = new RegExp(
    `(${escapeC(openTag)}[\\s\\S]+?${escapeC(closeTag)})`,
    "g"
  );

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
      const splittedKeys = keyword.split("");

      const convertedKey = splittedKeys.reduce(
        (acc, char) => `${acc}(${escapeC(char)})(.*?)`,
        "(.*?)"
      );
      const regKey = new RegExp(convertedKey, "i");

      const replacer = splittedKeys.reduce(
        (acc, _, i) => `${acc}${openTag}$${i * 2 + 2}${closeTag}$${i * 2 + 3}`,
        "$1"
      );

      const result = list.reduce(
        (acc, item) =>
          regKey.test(item.name)
            ? acc.concat({
                name: item.name
                  .replace(regKey, replacer)
                  .replace(combinePhrases, ""),
                _id: item._id,
              })
            : acc,
        []
      );

      return result.sort(
        (a, b) => findPriority(b.name, keyword) - findPriority(a.name, keyword)
      );
    },
  };
})();

export function shortName(user, length) {
  if (!user) return "Sign In";
  if (!length) return user.name;
  const name = user.name.split(" ")[0];
  return name.slice(0, length) + (name.length > length ? ".." : "");
}

export const getImgUrl = (productId, imgName) => {
  if (!imgName) return NO_IMAGE;
  // extern absolute Image Link? or embedded Image Link?
  return imgName.startsWith("http") || imgName.startsWith("/")
    ? imgName
    : `${process.env.REACT_APP_IMG_BASE_URL}${productId}/${imgName}`;
};
