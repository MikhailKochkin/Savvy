import { useState } from "react";
import styled from "styled-components";
import NumericTool from "./NumericTool";
import { Line } from "react-chartjs-2";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
  margin-bottom: 3%;
  padding: 3% 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  .explain {
    font-weight: bold;
    margin-bottom: 10px;
  }
  button {
    width: 150px;
    margin: 20px 0;
    cursor: pointer;
    background: #5ea0ed;
    border: none;
    border-radius: 5px;
    color: white;
    font-family: Montserrat;
    width: 150px;
    height: 40px;
    transition: all 0.2s;
    outline: 0;
    &:hover {
      background: #2a79d4;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
  }
`;

const Data = styled.div`
  width: 40%;
  margin-right: 3%;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Graphics = styled.div`
  width: 60%;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  .graph-container {
    padding: 3%;
  }
  @media (max-width: 800px) {
    width: 100%;
    margin-top: 5%;
  }
`;

const Block = styled.div`
  padding: 6% 8%;
  &.next {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  &.last {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  &.first {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Block2 = styled.div`
  padding: 4% 6%;
  &.next {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  &.last {
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  &.first {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const Result = styled.div`
  background: #27b353;
  color: white;
  width: 70%;
  text-align: center;
  padding: 2%;
  display: inline-block;
  border-radius: 5px;
`;

const Simulator = (props) => {
  // p * s = goal(h), это приложенные действия
  // y, k = максимальный результат при данных p s
  const [goal, setGoal] = useState(20398);
  const [result, setResult] = useState(100);
  const [index, setIndex] = useState(2);
  const k = 20400;
  const formula =
    "(-0.0002 * Math.pow(((-0.025 * Math.pow(p - 40, 2) + 40) * s) - 10000, 2)) + k";
  const [data, setData] = useState({
    labels: ["1"],
    datasets: [
      {
        label: "Эффективность рекламы в %",
        data: [0],
        fill: true,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  });
  const [means, setMeans] = useState([
    {
      id: "e",
      name: "Google Adwords",
      value: 1,
    },
    {
      id: "f",
      name: "SEO",
      value: 1,
    },
  ]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const getValue = (data) => {
    let new_means = means;
    let mean = new_means.find((m) => m.id == data.id);
    mean.value = data.value;
    setMeans(new_means);
  };

  const sum = () => {
    let p = means[0].value;
    let s = means[1].value;
    let total = eval(formula);
    setResult(total);
    let new_data = data;
    new_data.labels.push(index.toString());
    new_data.datasets[0].data.push(Number(((total * 100) / k).toFixed(2)));
    setData(new_data);
    setIndex(index + 1);
    console.log(result, goal);
    if (goal >= result) {
      props.getData(true, props.index);
    }
  };

  return (
    <Styles>
      <Container>
        <Data>
          <Block>
            <div className="explain">Данные:</div>
            <div>
              Регулируйте расходы на каждый из инструментов, чтобы найти
              оптимальное соотношение расходов на них и полученной прибыли.
            </div>
          </Block>
          <Block className="next">
            <div className="explain">Инструменты:</div>
            {means.map((el) => (
              <NumericTool
                key={el.id}
                num={el.id}
                type={el.type}
                name={el.name}
                value={el.value}
                means={means}
                formula={el.formula ? el.formula : null}
                getValue={getValue}
              />
            ))}
            <button onClick={(e) => sum()}>Считать</button>
          </Block>
          <Block>
            {result >= goal ? <Result>Решение найдено</Result> : null}
          </Block>
        </Data>
        <Graphics>
          <Block2 className="first">
            <div className="explain">Результаты:</div>
            <p>
              Выручка от использования каналов:{" "}
              <b>{Number(result.toFixed(2))}$</b>
            </p>
          </Block2>
          <div className="graph-container">
            <Line redraw={true} data={data} options={options} />
          </div>
        </Graphics>
      </Container>
    </Styles>
  );
};

export default Simulator;
