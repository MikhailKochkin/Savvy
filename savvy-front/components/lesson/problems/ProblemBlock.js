import { useState } from "react";
import styled from "styled-components";
import SingleTest from "../tests/SingleTest";
import SingleQuiz from "../quizes/SingleQuiz";

const Styles = styled.div`
  margin: ${(props) => (props.id === "first" ? "none" : "0 40px")};
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 100px 0;
  margin-right: ${(props) => (props.first ? "0" : "40px")};
  border-right: ${(props) => (props.first ? "none" : "1px solid #F4F2F2")};
  overflow: ${(props) => (props.id === "first" ? "auto" : "visible")};
`;

const Obj = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  .mini_arrow {
    width: 650px;
    text-align: center;
    font-size: 30px;
  }
  button {
    width: 50px;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  /* justify-content: center;
  align-items: center; */

  .but {
    height: 25px;
    /* width: 25px; */
    margin: 0 10px;
  }
`;

const Nodes = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
`;

const ProblemBlock = (props) => {
  const [reveal, setReveal] = useState(true);
  const [openChildren, setOpenChildren] = useState([]);
  const add = (index) => {
    setOpenChildren([...openChildren, props.obj.children[index]]);
  };

  const getData = (data) => {
    let index;
    data[0] ? (index = 0) : (index = 1);

    setOpenChildren([...openChildren, props.obj.children[index]]);
  };

  const open = (obj) => (
    <ProblemBlock
      me={props.me}
      lesson={props.lesson}
      tests={props.lesson.newTests}
      quizes={props.lesson.quizes}
      obj={obj}
    />
  );
  return (
    <Styles first={props.first}>
      {props.obj && (
        <Obj>
          <Head>
            {props.obj.type == "newtest" &&
              props.tests
                .filter((t) => t.id == props.obj.testID)
                .map((el) => (
                  <SingleTest
                    index={el.id}
                    key={el.id}
                    id={el.id}
                    testID={el.id}
                    question={el.question}
                    answers={el.answers}
                    ifRight={el.ifRight}
                    ifWrong={el.ifWrong}
                    true={el.correct}
                    user={el.user.id}
                    user_name={el.user}
                    type={el.type}
                    me={props.me}
                    userData={[]}
                    lessonID={props.lesson.id}
                    length={Array(el.correct.length).fill(false)}
                    // next={el.next}
                    getData={getData}
                    exam={true}
                    problem={true}
                  />
                ))}
            {props.obj.type == "quiz" &&
              props.quizes
                .filter((t) => t.id == props.obj.quizID)
                .map((el) => (
                  <SingleQuiz
                    key={el.id}
                    id={el.id}
                    type={el.type}
                    check={el.check}
                    question={el.question}
                    answer={el.answer}
                    answers={el.answers}
                    ifRight={el.ifRight}
                    ifWrong={el.ifWrong}
                    me={props.me}
                    hidden={true}
                    userData={props.lesson.quizResults}
                    lessonID={props.lesson.id}
                    quizID={el.id}
                    user={el.user.id}
                    user_name={el.user}
                    next={el.next}
                    getData={getData}
                    exam={true}
                    problem={true}
                  />
                ))}
            <br />
            {/* <button onClick={(e) => add(0)}>Click 0</button>
            <button onClick={(e) => add(1)}>Click 1</button>
            <button onClick={(e) => add(2)}>Click 2</button> */}
          </Head>
          <div className="mini_arrow">{openChildren.length == 0 && null}</div>
          <div className="mini_arrow">{openChildren.length == 1 && ""}</div>
          <div className="mini_arrow">
            {openChildren.length == 2 && `↙️   ↘️`}
          </div>
          <div className="mini_arrow">
            {openChildren.length == 3 && " ↙️ ⬇️ ↘️ "}
          </div>
          <Nodes>{openChildren.map((n) => open(n))}</Nodes>
        </Obj>
      )}
    </Styles>
  );
};

export default ProblemBlock;
