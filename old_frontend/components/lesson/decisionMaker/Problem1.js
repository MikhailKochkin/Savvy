import { useState } from "react";
import styled from "styled-components";
import Tool from "./Tool";
import { Bar } from "react-chartjs-2";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3%;
  padding: 3% 0;
  background: #f4f4f4;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
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
  .explain {
    font-weight: bold;
    margin-bottom: 10px;
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
  const [goal, setGoal] = useState(160);
  const [result, setResult] = useState(0);
  const [chosenMeans, setChosenMeans] = useState([]);
  const [chosenMeans2, setChosenMeans2] = useState([]);
  const [availableFeedback, setAvailableFeedback] = useState([]);
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Эффективность каналов продаж",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [],
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
  const [means, setMeans] = useState([
    {
      id: "a",
      num: 0,
      type: "controlled",
      name: "Email",
      value: 20,
    },
    {
      id: "b",
      num: 1,
      type: "controlled",
      name: "СМИ",
      value: 10,
    },
    {
      id: "c",
      num: 2,
      type: "controlled",
      name: "SEO",
      value: 20,
    },
    {
      id: "d",
      num: 3,
      type: "controlled",
      name: "Google",
      value: 40,
    },
  ]);

  const [synergy, setSynergy] = useState([
    [0, -20, 30, 10],
    [-20, 0, -60, -60],
    [30, -60, 0, 40],
    [10, -60, 40, 0],
  ]);

  const feedback = [
    [
      "Email-маркетинг – работает, но его точно не хватит",
      "Email-маркетинг и СМИ не очень работают вместе",
      "Email-маркетинг и SEO отлично работают вместе",
      "Email-маркетинг и Google Adwords хорошо работают вместе",
    ],
    [
      "Email-маркетинг и СМИ не очень работают вместе",
      "Реклама в СМИ – работает сама по себе, но вредит в сочетании с чем-то еще",
      "СМИ и SEO очень плохо работают вместе",
      "Контекстная реклама плохо работает с рекламой в СМИ",
    ],
    [
      "Email-маркетинг и SEO отлично работают вместе",
      "СМИ и SEO очень плохо работают вместе",
      "SEO – хорош, но его точно не хватит",
      "SEO и Google Adwords отлично работают вместе",
    ],
    [
      "Email-маркетинг и Google Adwords хорошо работают вместе",
      "Google Adwords плохо работает с рекламой в СМИ",
      "SEO и Google Adwords отлично работают вместе",
      "Google Adwords в 2020 работает максимально эффективно",
    ],
  ];

  const onChoose = (id) => {
    if (!chosenMeans.includes(id)) {
      setChosenMeans([...chosenMeans, id]);
      setChosenMeans2([...chosenMeans2, means.find((m) => m.id == id)]);
    } else {
      setChosenMeans(chosenMeans.filter((el) => el !== id));
      setChosenMeans2(chosenMeans2.filter((m) => m.id !== id));
    }
  };

  const sum = () => {
    let val = 0;
    let arr_chosen = [];
    means.map((m) => {
      if (chosenMeans.includes(m.id)) {
        arr_chosen.push(m);
        return (val += m.value);
      }
    });
    let arr = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    chosenMeans2.map((c) => {
      arr2.push(c.name);
      arr3.push(c.value);
      console.log(feedback[c.num][c.num]);
      arr4.push(feedback[c.num][c.num]);
    });
    if (arr_chosen.length > 1) {
      var n = arr_chosen.length;
      var i, j;
      for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
          console.log(arr_chosen[i], arr_chosen[j]);
          arr.push([arr_chosen[i].num, arr_chosen[j].num]);
          arr2.push(`${arr_chosen[i].name} & ${arr_chosen[j].name}`);
          arr3.push(synergy[arr_chosen[i].num][arr_chosen[j].num]);
          arr4.push(feedback[arr_chosen[i].num][arr_chosen[j].num]);
        }
      }
    }
    arr.map((a) => {
      // console.log((val += synergy[a[0]][a[1]]));
      return (val += synergy[a[0]][a[1]]);
    });
    setResult(val);

    let new_data = data;
    new_data.labels = arr2;
    new_data.datasets[0].data = arr3;
    setData(new_data);
    setAvailableFeedback(arr4);
    console.log(val, goal);
    if (val >= goal) {
      props.getData(true, props.index);
    }
  };
  return (
    <Styles>
      <Container>
        <Data>
          <Block>
            <div className="explain">Данные:</div>
            <p>
              Отдел маркетинга предложил следующие потенциальные инструменты:
              email-маркетинг, публикации в СМИ и другие формы PR, поисковую
              оптимизацию (SEO), а также контекстную рекламу Google Adwords. Они
              также дали оценку тому, как эти инструменты работают вместе.
            </p>
            <p>
              Изучите дэшборд, созданный отделом маркетинга, и примите решение о
              том, какие инструменты стоит использовать.
            </p>
          </Block>
          <Block className="next">
            <div className="explain">Инструменты:</div>
            {means.map((el) => (
              <Tool
                key={el.id}
                num={el.id}
                type={el.type}
                name={el.name}
                value={el.value}
                means={means}
                formula={el.formula ? el.formula : null}
                onChoose={onChoose}
              />
            ))}
            <button onClick={(e) => sum()}>Оценить</button>
          </Block>
          <Block>
            {result >= goal ? <Result>Решение найдено</Result> : null}
          </Block>
        </Data>
        <Graphics>
          <Block2 className="first">
            <div className="explain">Результаты:</div>
            <div>
              Общая ценность каналов: <b>{result}</b>
            </div>
          </Block2>
          <div className="graph-container">
            {/* <div> */}
            <Bar
              data={data}
              options={{
                maintainAspectRatio: true,
                legend: {
                  display: true,
                },
                scales: {
                  xAxes: [{ display: true }],
                  yAxes: [
                    {
                      display: true,
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
            {/* </div> */}
          </div>
          <Block className="last">
            <div className="explain">Инсайты:</div>
            {availableFeedback.length > 0 &&
              availableFeedback.map((a) => <li>{a}</li>)}
          </Block>
        </Graphics>
      </Container>
    </Styles>
  );
};

export default Simulator;
