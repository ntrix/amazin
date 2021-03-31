import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const RATES_SOURCE =
  "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html";
export const NO_IMAGE = "/images/no-image.png";
export const MAX_IMAGES = 8;

export default Carousel;

/* responsive resolutions for multi-carousel */
export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 5,
    slidesToSlide: 4, // optional, default to 1.
  },
  largeDesktop: {
    breakpoint: { max: 1500, min: 1080 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1080, min: 720 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 720, min: 480 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

/* price range filter width label name */
export const prices = [0.01, 20, 50, 100, 200, 500, 1000, 2000, 5000].map(
  (max, i, arr) => ({
    min: arr[i - 1] || 0,
    max,
    name: `${+arr[i - 1] | 0} to ${max | 0} EUR`,
  })
);
prices[0] = { min: 0, max: 0, name: "Any" };

/* rating stars filter */
export const ratings = [
  {
    name: "4stars & up",
    rating: 4,
  },

  {
    name: "3stars & up",
    rating: 3,
  },

  {
    name: "2stars & up",
    rating: 2,
  },

  {
    name: "1stars & up",
    rating: 1,
  },
];

/* singleton for currency and all its pipes, rates, calculations */
export const pipe = {
  //if (this.currency ) return this;
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
    return (price * rate).toFixed(2);
  },
  getNote(price = 0, rate = this.getRate()) {
    return ((price * rate) | 0).toString();
  },
  getCent(price = 0, rate = this.getRate()) {
    return (price * rate).toFixed(2).slice(-2);
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

/* create 5 placeholders for seller info */
export const dummySellers = Array(5).fill({
  _id: "#",
  seller: { logo: NO_IMAGE, name: "Anonymous Seller" },
});

/* create 5 placeholders for product info */
export const dummyProducts = Array(6).fill({
  _id: "#",
  image: NO_IMAGE,
  name: "Product Name",
  price: 0,
  deal: 1,
  category: "Product Category",
  rating: 0,
  numReviews: 0,
});

export const NO_MOVIES = [
  {
    name: "",
    image: "",
    description: "",
  },
];

/* create 2 example Movies as placeholders for videoScreen movie banner */
export const EXAMPLE_MOVIES = [
  {
    name: "Stranger Things",
    image:
      " ^https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    image:
      " ^https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    description:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];

const baseURL = "https://image.tmdb.org/t/p/original/";

/* adapter pattern (or create placeholders if not exists) for video movies source from 3rd party API */
export const sourceAdapter = (movies) =>
  movies?.map((m) => ({
    name:
      m.name || m.title || m.original_title || m.original_name || "Movie Name",
    image:
      m.image || [baseURL + m.poster_path, baseURL + m.backdrop_path].join("^"),
    rating: m.rating || m.vote_average / 2 || 0, //rating STEP /10
    numReviews: m.numReviews || m.vote_count || 0,
    description: m.description || m.overview || "",
    video: m.video,
    seller: m.seller,
    _id: m._id,
  }));

/* create an array of 12 dummyMovies (a row) for videoRow(s) */
export const dummyMovies = sourceAdapter(Array(12).fill(1));

/* find suggestions util. for searchBox's dropdown suggest list */
export const findSuggest = (() => {
  const openTag = "<b>";
  const closeTag = "</b>";
  // eslint-disable-next-line
  const escapeC = (s) => s.replace(/[\-#$\^*()+\[\]{}|\\,.?\s]/g, "\\$&");

  const combinePhrases = new RegExp(escapeC(closeTag + openTag), "g");

  const group = new RegExp(
    "(" + escapeC(openTag) + "[\\s\\S]+?" + escapeC(closeTag) + ")",
    "g"
  );

  const findPriority = (string, word) => {
    let prior = 0;
    word = openTag + word + closeTag;
    string.replace(group, (found) => {
      if (word === found) prior = 999;
      else if (found.length > prior) prior = found.length;
    });
    return prior;
  };

  return {
    search(list, keyword) {
      if (!list || !keyword) return [];

      keyword = keyword.slice(0, 49);
      const splittedKeys = keyword.split("");

      const convertedKey = splittedKeys.reduce(
        (acc, char) => acc + "(" + escapeC(char) + ")(.*?)",
        "(.*?)"
      );
      const regKey = new RegExp(convertedKey, "i");

      const replacer = splittedKeys.reduce(
        (acc, _, i) =>
          acc + openTag + "$" + (i * 2 + 2) + closeTag + "$" + (i * 2 + 3),
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

export const getImgUrl = (productId, imgName) =>
  !imgName
    ? NO_IMAGE
    : imgName.startsWith("http") || imgName.startsWith("/") // extern absolute Image Link? or embedded Image Link?
    ? imgName // otherwise  BASE_URL/appName/sellerID/productId/imgName only need to save the imgName to DB
    : `${process.env.REACT_APP_IMG_BASE_URL}${productId}/${imgName}`;
