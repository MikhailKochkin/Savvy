import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const MainChart = ({ evaluationHistory, parent }) => {
  Chart.register(...registerables);
  const labels = evaluationHistory.map((item, index) => index + 1);
  const options = {
    responsive: true,
    plugins: {},
  };
  const data = {
    labels,
    datasets: [
      {
        label: parent.label,
        data: evaluationHistory.map((item) => item.results[parent.label]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default MainChart;
