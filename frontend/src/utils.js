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

export const pipe = (currencyType = "EUR") => ({
  currencies: ["EUR", "GBP", "USD", "PLN", "CZK", "CHF"],
  symbol: {
    GBP: "£",
    USD: "$",
    PLN: "zł",
    CZK: "Kč",
    CHF: "CHf",
    EUR: "€",
  }[currencyType],
  name: {
    GBP: "GB Pounds",
    USD: "US Dollar",
    PLN: "Polish Zloty",
    CZK: "Czech Koruna",
    CHF: "Swiss France",
    EUR: "Euro (Default)",
  }[currencyType],
});

export const getPrice = (rate = 1) => (price = 0) => ({
  note: ((price * rate) | 0) + "",
  cent: ((price * rate).toFixed(2) + "").slice(-2),
  all: (price * rate).toFixed(2),
  float: +(price * rate).toFixed(2),
});
