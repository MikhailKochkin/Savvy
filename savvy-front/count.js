let ratings = [10, 7, 10, 4, 10, 10, 10, 10, 3, 10, 10, 6, 7, 7, 10, 10, 10, 8];

totalCount = average = (
  ratings.reduce((a, b) => a + b, 0) / ratings.length
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

console.log("totalCount", totalCount, medianFunc(ratings), ratings.length);
