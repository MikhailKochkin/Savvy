const entries = [
  { firstAction: "08.08.2024 – 2:35 PM", lastAction: "08.08.2024 – 3:03 PM" },
  { firstAction: "08.08.2024 – 2:33 PM", lastAction: "08.08.2024 – 3:18 PM" },
  { firstAction: "08.08.2024 – 2:31 PM", lastAction: "08.08.2024 – 2:59 PM" },
  { firstAction: "08.08.2024 – 2:30 PM", lastAction: "08.08.2024 – 2:52 PM" },
  { firstAction: "08.08.2024 – 2:27 PM", lastAction: "08.08.2024 – 2:56 PM" },
];

function parseDate(dateString) {
  return new Date(
    dateString.replace("–", " ").replace(/(\d+:\d+ [APM]{2})/, "$1")
  );
}

function calculateAverageTime(entries) {
  const durations = entries.map((entry) => {
    const firstDate = parseDate(entry.firstAction);
    const lastDate = parseDate(entry.lastAction);
    return (lastDate - firstDate) / 1000 / 60; // duration in minutes
  });

  const averageDuration =
    durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  return averageDuration;
}

const averageTime = calculateAverageTime(entries);
console.log(
  `Average time between first action and last action: ${averageTime.toFixed(
    2
  )} minutes`
);
