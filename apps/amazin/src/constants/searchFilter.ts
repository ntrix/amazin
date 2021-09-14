/* price range filter width label name */
export const prices = [0.01, 20, 50, 100, 200, 500, 1000, 2000, 5000].map((max, i, arr) => ({
  max,
  min: arr[i - 1] || 0,
  name: `${+arr[i - 1] | 0} to ${max | 0} EUR`
}));
prices[0] = { min: 0, max: 0, name: 'Any' };

/* rating stars filter */
export const ratings = [
  {
    name: '4stars & up',
    rating: 4
  },
  {
    name: '3stars & up',
    rating: 3
  },
  {
    name: '2stars & up',
    rating: 2
  },
  {
    name: '1stars & up',
    rating: 1
  },
  {
    name: 'Any & up',
    rating: 0
  }
];
