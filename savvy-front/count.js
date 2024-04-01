let ratings = [
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 8,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
  {
    rating: 10,
  },
];

function getObjectValues(arr) {
  return arr.map((obj) => obj.rating);
}

totalCount = average = (
  getObjectValues(ratings).reduce((a, b) => a + b, 0) / ratings.length
).toFixed(2);

const medianFunc = (values) => {
  // if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
};

console.log(
  "totalCount",
  totalCount,
  medianFunc(getObjectValues(ratings)),
  getObjectValues(ratings).length
);
