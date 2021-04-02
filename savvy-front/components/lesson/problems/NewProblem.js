import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProblemBlock from "./ProblemBlock";
import DecisionTree from "./DecisionTree";

const Solution = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  .ex1 {
    background-color: lightblue;
    width: 40px;
    overflow-x: scroll;
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    width: 50%;
    p {
      font-size: 1.6rem;
    }
  }
`;

const Children = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-items: center; */
  overflow-x: auto;
  white-space: nowrap;
  width: 600px;
  .child {
    width: 800px;
    text-align: center;
    display: inline-block;
    input {
      width: 500px;
    }
  }
`;

const Scrollable = styled.div``;

const Container = styled.div``;

const TreeContainer = styled.div``;

const NewProblem = (props) => {
  const [index, setIndex] = useState(0);
  const [newOption, setNewOption] = useState("");
  const [tree, setTree] = useState();

  const simple_data = {
    id: "ckmdc6uyp0905pirkob9feij7",
    type: "newtest",
    name: "Выбор траектории решения",
    attributes: {
      Номер: "1",
    },
    testID: "ckmdc6uyp0905pirkob9feij7",
    children: [
      {
        id: "ckmdc9hdc1156pirkx3sem449",
        type: "newtest",
        name: "С позиции ответчика: шаг 1.",
        testID: "ckmdc9hdc1156pirkx3sem449",
        attributes: {
          Номер: "2",
        },
        children: [
          {
            id: "ckmdc9hdc1156pirkx3sem449",
            type: "newtest",
            name: "Про способы защиты",
            testID: "ckmdc9hdc1156pirkx3sem449",
            attributes: {
              Номер: "4",
            },
            children: [],
          },
          {
            id: "ckmdc86pj1030pirkjkbyrshy",
            type: "quiz",
            name: "Пояснение по шагу 1",
            attributes: {
              Номер: "5",
            },
            quizID: "ckmdc86pj1030pirkjkbyrshy",
            children: [],
          },
        ],
      },
      {
        id: "ckmdc86pj1030pirkjkbyrshy",
        type: "quiz",
        name: "С позиции истца. Шаг 1.",
        attributes: {
          Номер: "3",
        },
        quizID: "ckmdc86pj1030pirkjkbyrshy",
        children: [
          {
            id: "ckmdc9hdc1156pirkx3sem449",
            type: "newtest",
            name: "Какие есть требования?",
            testID: "ckmdc9hdc1156pirkx3sem449",
            attributes: {
              Номер: "6",
            },
            children: [],
          },
          {
            id: "ckmdc86pj1030pirkjkbyrshy",
            type: "quiz",
            name: "Пояснение по шагу 1",
            attributes: {
              Номер: "7",
            },
            quizID: "ckmdc86pj1030pirkjkbyrshy",
            children: [],
          },
        ],
      },
    ],
  };

  const open = (obj) => (
    <ProblemBlock
      me={props.me}
      lesson={props.lesson}
      tests={props.lesson.newTests}
      quizes={props.lesson.quizes}
      obj={obj}
      first={true}
    />
  );

  useEffect(() => {
    setTree(simple_data);
  }, []);
  return (
    <Styles>
      <div className="text">
        <h2>Решение кейсов</h2>
        <p>
          А что если мы хотим научить студента решать полноценный кейс? Решение
          которого состоит из нескольких этапов и у которого может быть
          несколько вариантов решения?
        </p>
        <p>
          Такие задания мы тоже умеем делать. Они состоят из двух частей. Слева
          мы задаем наводящие вопросы и даем теоретический материал. А справа
          через дерево решений показываем общую структуру решения кейса.{" "}
        </p>
      </div>
      <Solution>
        <Container>
          <div className="tree">{tree !== "" && open(tree)}</div>
        </Container>
        <TreeContainer>
          <DecisionTree data={simple_data} />
        </TreeContainer>
      </Solution>
    </Styles>
  );
};

export default NewProblem;
