export const prices = [0.1, 20, 50, 100, 200, 500, 1000, 2000, 5000].map(
  (max, i, arr) => ({
    min: arr[i - 1] || 0,
    max,
    name: arr[i - 1] ? `${+arr[i - 1] | 0} to ${max | 0} EUR` : "Any",
  })
);

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
