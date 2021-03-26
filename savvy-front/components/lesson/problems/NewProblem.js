import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ProblemBlock from "./ProblemBlock";
import DecisionTree from "./DecisionTree";

const Styles = styled.div`
  display: flex;
  flex-direction: row;
  .ex1 {
    background-color: lightblue;
    width: 40px;
    overflow-x: scroll;
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
    name: "Тестовый вопрос",
    attributes: {
      Вопрос: "Про доверенность",
    },
    testID: "ckmdc6uyp0905pirkob9feij7",
    children: [
      {
        id: "ckmdc9hdc1156pirkx3sem449",
        type: "newtest",
        name: "Тестовый вопрос",
        testID: "ckmdc9hdc1156pirkx3sem449",
        attributes: {
          Вопрос: "Про судебную практику",
        },
        children: [
          {
            id: "ckmdc9hdc1156pirkx3sem449",
            type: "newtest",
            name: "Тестовый вопрос",
            testID: "ckmdc9hdc1156pirkx3sem449",
            attributes: {
              Вопрос: "Про судебную практику",
            },
            children: [],
          },
          {
            id: "ckmdc86pj1030pirkjkbyrshy",
            type: "quiz",
            name: "Тестовый вопрос",
            attributes: {
              Вопрос: "Про отзывы",
            },
            quizID: "ckmdc86pj1030pirkjkbyrshy",
            children: [],
          },
        ],
      },
      {
        id: "ckmdc86pj1030pirkjkbyrshy",
        type: "quiz",
        name: "Тестовый вопрос",
        attributes: {
          Вопрос: "Про отзывы",
        },
        quizID: "ckmdc86pj1030pirkjkbyrshy",
        children: [
          {
            id: "ckmdc9hdc1156pirkx3sem449",
            type: "newtest",
            name: "Тестовый вопрос",
            testID: "ckmdc9hdc1156pirkx3sem449",
            attributes: {
              Вопрос: "Про судебную практику",
            },
            children: [],
          },
          {
            id: "ckmdc86pj1030pirkjkbyrshy",
            type: "quiz",
            name: "Тестовый вопрос",
            attributes: {
              Вопрос: "Про отзывы",
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
      <Container>
        <div className="tree">{tree !== "" && open(tree)}</div>
      </Container>
      <TreeContainer>
        <DecisionTree data={simple_data} />
      </TreeContainer>
    </Styles>
  );
};

export default NewProblem;
