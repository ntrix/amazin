import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

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
/* singleton for currencyType and all its pipes */
export const pipe = {
  //if (this.currencyType ) return this;
  currencyType: "EUR",
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
  setCurrency: (currencyType) => (pipe.currencyType = currencyType),
  updateRates: (newRates) => {
    if (newRates?.length)
      pipe.currencies.map((c) => (pipe.rates[c] = newRates[c]));
  },
  getSymbol: (currencyType) =>
    ({
      GBP: "£",
      USD: "$",
      PLN: "zł",
      CZK: "Kč",
      CHF: "CHf",
      EUR: "€",
    }[currencyType || pipe.currencyType]),
  getName: (currencyType) =>
    ({
      GBP: "GB Pounds",
      USD: "US Dollar",
      PLN: "Polish Zloty",
      CZK: "Czech Koruna",
      CHF: "Swiss France",
      EUR: "Euro (Default)",
    }[currencyType || pipe.currencyType]),
  getRate: (currencyType) => pipe.rates[currencyType || pipe.currencyType] || 1,
  getPrice: (price = 0, rate = pipe.getRate()) => (price * rate).toFixed(2),
  getNote: (price = 0, rate = pipe.getRate()) => ((price * rate) | 0) + "",
  getCent: (price = 0, rate = pipe.getRate()) =>
    ((price * rate).toFixed(2) + "").slice(-2),
  showPrice: (price) => pipe.getSymbol() + " " + pipe.getPrice(price),
};
