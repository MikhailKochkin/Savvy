import { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const Styles = styled.div`
  padding: 2%;
  border-bottom: 1px solid #edefed;
  width: 100%;
  margin: 30px 0px;
  position: relative;
  height: 300px;
  border: 1px dashed #edefed;
`;

const StudentSimulatorJourney = (props) => {
  Chart.register(...registerables);
  let data_labels = props.maxes.map(function (item) {
    return {
      progress: item.progress,
      total:
        item.lesson.structure && item.lesson.structure.lessonItems
          ? item.lesson.structure.lessonItems.length
          : 0,
    };
  });
  let data_percent = data_labels.map((item) => {
    return Math.round((item.progress / item.total) * 100);
  });
  let background_color = data_percent.map((item) => {
    if (item > 80) {
      return "#60B55A";
    } else if (item > 30 && item <= 80) {
      return "rgba(242, 193, 78)";
    } else {
      return "rgba(247, 129, 84)";
    }
  });
  let background_color_hover = data_percent.map((item) => {
    if (item > 80) {
      return "#60B55A";
    } else if (item > 30 && item <= 80) {
      return "rgba(242, 193, 78, 0.8)";
    } else {
      return "rgba(247, 129, 84, 0.8)";
    }
  });
  let data_data = props.maxes.map(function (item) {
    return item.lesson.number;
  });
  const [data, setData] = useState({
    labels: data_data,
    datasets: [
      {
        label: "Lessons results",
        backgroundColor: background_color,
        borderColor: background_color,
        borderWidth: 1,
        data: data_percent,
      },
    ],
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: false,
            ticks: {
              min: 0,
            },
          },
        ],
        yAxes: [
          {
            display: false,
          },
        ],
      },
    },
  });

  return (
    <Styles>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          legend: {
            display: true,
          },
          scales: {
            xAxes: [{ display: true, barPercentage: 0.8 }],
            yAxes: [
              {
                display: true,
                ticks: {
                  max: 100,
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </Styles>
  );
};

export default StudentSimulatorJourney;
