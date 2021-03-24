import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const NO_IMAGE = "images/no-image.png";

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
export default Carousel;

export const prices = [0.01, 20, 50, 100, 200, 500, 1000, 2000, 5000].map(
  (max, i, arr) => ({
    min: arr[i - 1] || 0,
    max,
    name: `${+arr[i - 1] | 0} to ${max | 0} EUR`,
  })
);
prices[0] = { min: 0, max: 0, name: "Any" };

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
/* singleton for currency and all its pipes */
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
  getSymbol(currency) {
    return {
      GBP: "£",
      USD: "$",
      PLN: "zł",
      CZK: "Kč",
      CHF: "CHf",
      EUR: "€",
    }[currency || this.currency];
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
    return ((price * rate) | 0) + "";
  },
  getCent(price = 0, rate = this.getRate()) {
    return ((price * rate).toFixed(2) + "").slice(-2);
  },
  showPrice(price) {
    return this.getSymbol() + " " + this.getPrice(price);
  },
};

export const savePath = (exceptionStartWith = "@") => () => {
  //doesn't save path of the same screen
  if (!window.location.pathname.startsWith(exceptionStartWith))
    localStorage.setItem("backToHistory", window.location.pathname);
};

export const dummySellers = Array(5).fill({
  _id: "#",
  seller: { logo: NO_IMAGE, name: "Anonymous Seller" },
});

export const dummyBanners = [
  {
    name: "Stranger Things",
    images: [
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    ],
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  },
  {
    name: "The Queen's Gambit",
    images: [
      "https://image.tmdb.org/t/p/original/34OGjFEbHj0E3lE2w0iTUVq0CBz.jpg",
    ],
    description:
      "In a Kentucky orphanage in the 1950s, a young girl discovers an astonishing talent for chess while struggling with addiction.",
  },
];

const baseURL = "https://image.tmdb.org/t/p/original/";
export const sourceAdapter = (movies) =>
  movies?.map((m) => ({
    name:
      m.name || m.title || m.original_title || m.original_name || "Movie Name",
    images: [
      m.backdrop_path
        ? baseURL + m.backdrop_path
        : m.image?.split("^")[1] || NO_IMAGE,
      m.poster_path
        ? baseURL + m.poster_path
        : m.image?.split("^")[0] || NO_IMAGE,
    ],
    rating: m.rating * 2 || m.vote_average || 0,
    numReviews: m.numReviews || m.vote_count || 0,
    description: m.description || m.overview || "",
    video: m.video,
    seller: m.seller,
    _id: m._id,
  }));

export const dummyMovies = sourceAdapter(Array(12).fill(1));
