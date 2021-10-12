import { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteSingleQuiz from "../../delete/DeleteSingleQuiz";
import UpdateQuiz from "./UpdateQuiz";
import renderHTML from "react-render-html";
import { CURRENT_USER_QUERY } from "../../User";

const CREATE_QUIZRESULT_MUTATION = gql`
  mutation CREATE_QUIZRESULT_MUTATION(
    $answer: String
    $quiz: String
    $lessonId: String
    $correct: Boolean
  ) {
    createQuizResult(
      answer: $answer
      quiz: $quiz
      lessonId: $lessonId
      correct: $correct
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  /* width: ${(props) => props.width}; */
  width: 650px;
  margin-bottom: 3%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 60%;
  max-width: 80%;
  margin-bottom: 20px;
`;

const Option = styled.div`
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #c4c4c4;
  padding: 10px 15px;
  cursor: pointer;
  margin-right: 3%;
  margin-bottom: 2%;
  height: 50px;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
  }
`;

const Question = styled.div`
  display: flex;
  flex-direction: column;
  flex: 50%;
  margin-bottom: 3%;
  margin-top: ${(props) => (props.story ? "2%" : "0%")};
  p {
    margin: 5px 0;
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .question {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .question_name {
    margin-left: 5px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2% 3%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .question_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    min-width: 40%;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  button {
    width: 30%;
    padding: 2%;
    margin-top: 5%;
  }
  @media (max-width: 800px) {
    padding: 0%;
    margin-bottom: 5%;
    button {
      width: 50%;
      padding: 3%;
    }
  }
`;

const Answer_text = styled.textarea`
  height: 140px;
  min-width: 60%;
  max-width: 70%;
  border: 2px solid;
  border-color: ${(props) => props.inputColor};
  outline: 0;
  resize: none;
  border-radius: 25px;
  padding: 3% 4%;
  line-height: 1.8;
  font-family: Montserrat;
  font-size: 1.6rem;
  margin-bottom: 20px;
`;

const Group = styled.div`
  flex-direction: row;
  justify-content: center;
  background: ${(props) => props.inputColor};
  width: 100%;
  pointer-events: ${(props) => (props.progress === "true" ? "none" : "auto")};
  display: ${(props) => (props.correct === "true" ? "none" : "flex")};
  padding: 0.5% 0;
  margin-bottom: 3%;
  div {
    padding: 0.5% 0;
    cursor: pointer;
  }
`;

const Button1 = styled.div`
  width: 60%;
  text-align: center;
  background: #d2edfd;
  border-radius: 5px;
  cursor: pointer;
  color: #000a60;
  border: none;
  font-size: 1.6rem;
  transition: all 0.3s ease;
  display: ${(props) => (props.correct === "true" ? "none" : "block")};
  pointer-events: ${(props) => (props.correct === "true" ? "none" : "auto")};
  &:hover {
    background: #a5dcfe;
  }
`;

const Progress = styled.div`
  display: ${(props) => (props.display === "true" ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 0 0 2% 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
  },
})(Button);

const Block = styled.div`
  display: ${(props) => (props.display === "true" ? "block" : "none")};
  #comment {
    margin-bottom: 2%;
  }
`;

const SingleQuiz = (props) => {
  const [answer, setAnswer] = useState(""); // The answer provided by the student
  const [correct, setCorrect] = useState(""); // is the answer by the student correct?
  const [update, setUpdate] = useState(false);
  const [sent, setSent] = useState(false);
  const [hidden, setHidden] = useState(true); // is the answer to the question hidden?
  const [hint, setHint] = useState(null); // give the hint to the student
  const [showComment, setShowComment] = useState(false); // give the comment to the answer of the student
  const [progress, setProgress] = useState("false");
  const [inputColor, setInputColor] = useState("#f3f3f3");

  const onAnswer = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        setCorrect("true");
        setInputColor("rgba(50, 172, 102, 0.25)");
        onMove("true");
      } else {
        setCorrect("false");
        setInputColor("rgba(222, 107, 72, 0.5)");
        onMove("false");
      }
    } else {
      const r = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (parseFloat(res.res) > 65) {
            console.log(res);
            setCorrect("true");
            setInputColor("rgba(50, 172, 102, 0.25)");
            onMove("true");
          } else {
            setCorrect("false");
            setInputColor("rgba(222, 107, 72, 0.5)");
            if (typeof res.comment === "string") {
              setHint(res.comment);
            }
            onMove("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onSend = async (e) => {
    setProgress("true");
    let data1 = {
      answer1: props.answer.toLowerCase(),
      answer2: answer.toLowerCase(),
    };
    if (props.check === "WORD") {
      if (props.answer.toLowerCase() === answer.toLowerCase()) {
        setCorrect("true");
        onMove("true");
      } else {
        setCorrect("false");
        onMove("false");
      }
    } else {
      const r = await fetch(
        "https://arcane-refuge-67529.herokuapp.com/checker",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data1),
        }
      )
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          if (parseFloat(res.res) > 65) {
            console.log(res);
            setCorrect("true");
            onMove("true");
          } else {
            setCorrect("false");
            if (typeof res.comment === "string") {
              setHint(res.comment);
            }
            onMove("false");
          }
        })
        .catch((err) => console.log(err));
    }
    setProgress("false");
  };

  const onMove = (result) => {
    // 1. if the data is sent for the first time
    if (!sent) {
      // 2. and if we get the right answer
      if (result === "true" && props.getData) {
        // 3. and if this quiz is a part of an exam
        props.getData(
          props.next && props.next.true
            ? [true, props.next.true]
            : [true, { type: "finish" }],
          "true"
        );
      }
      // 2. and if we get the wrong answer
      else if (result === "false" && props.getData) {
        // 3. and if this quiz is a part of an exam
        // 4. we transfer the "false" data to the exam component
        props.getData(
          props.next && props.next.false
            ? [false, props.next.false]
            : [false, { type: "finish" }]
        );
      }
      setSent(true);
    }
  };

  const {
    me,
    user,
    userData,
    exam,
    story,
    complexity,
    ifWrong,
    ifRight,
    check,
    user_name,
    author,
  } = props;
  let data;
  if (me) {
    data = userData
      .filter((el) => el.quiz.id === props.id)
      .filter((el) => el.student.id === me.id);
  }
  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "100%";
  }
  return (
    <Mutation
      mutation={CREATE_QUIZRESULT_MUTATION}
      variables={{
        quiz: props.quizID,
        lessonId: props.lessonID,
        answer: answer,
        correct: correct === "true",
      }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(createQuizResult, { loading, error }) => (
        <Styles width={width}>
          <Buttons>
            {!exam && !story && (
              <StyledButton onClick={(e) => setUpdate(!update)}>
                {!update ? "Изменить" : "Назад"}
              </StyledButton>
            )}
            {me && me.id === user && !props.exam && !props.story ? (
              <DeleteSingleQuiz
                id={me.id}
                quizID={props.quizID}
                lessonID={props.lessonID}
              />
            ) : null}
          </Buttons>
          {!update && (
            <>
              <Question story={story}>
                <div className="question">
                  <div className="question_text">
                    {renderHTML(props.question)}
                  </div>
                  <IconBlock>
                    {author && author.image != null ? (
                      <img className="icon" src={author.image} />
                    ) : (
                      <img className="icon" src="../../static/hipster.svg" />
                    )}{" "}
                    <div className="name">
                      {author && author.name ? author.name : "BeSavvy"}
                    </div>
                  </IconBlock>{" "}
                </div>
                <div className="answer">
                  <IconBlock>
                    <img className="icon" src="../../static/flash.svg" />
                    <div className="name">{me.name}</div>
                  </IconBlock>{" "}
                  <Answer_text
                    type="text"
                    required
                    inputColor={inputColor}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="..."
                  />
                </div>
                <Progress display={progress}>
                  <CircularProgress />
                </Progress>
                <Group progress={progress} correct={correct}>
                  <Button1
                    inputColor={inputColor}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (props.type === "FORM") {
                        const res1 = await onSend();
                      } else {
                        const res = await onAnswer();
                      }
                      setProgress("false");
                      const res0 = await createQuizResult();
                    }}
                    correct={correct}
                  >
                    Проверить
                  </Button1>
                </Group>
                {correct === "true" && (
                  <div className="question">
                    <div className="question_text">
                      {!props.type != "FORM" && "Правильно"}!{" "}
                      {ifRight && ifRight !== "<p></p>" && renderHTML(ifRight)}{" "}
                      {!props.type != "FORM" && "Показать правильный ответ?"}
                    </div>
                    <IconBlock>
                      {author && author.image != null ? (
                        <img className="icon" src={author.image} />
                      ) : (
                        <img className="icon" src="../../static/hipster.svg" />
                      )}{" "}
                      <div className="name">
                        {author && author.name ? author.name : "BeSavvy"}
                      </div>
                    </IconBlock>
                  </div>
                )}
                {correct === "false" && (
                  <div className="question">
                    <div className="question_text">
                      {props.type != "FORM" && "Не совсем" + "..."}
                      {ifWrong &&
                        ifWrong !== "<p></p>" &&
                        renderHTML(ifWrong)}{" "}
                      {hint !== null &&
                        hint !== 0 &&
                        props.type != "FORM" &&
                        hint}
                      {props.type != "FORM" && "Показать правильный ответ?"}
                    </div>
                    <IconBlock>
                      {author && author.image != null ? (
                        <img className="icon" src={author.image} />
                      ) : (
                        <img className="icon" src="../../static/hipster.svg" />
                      )}{" "}
                      <div className="name">
                        {author && author.name ? author.name : "BeSavvy"}
                      </div>
                    </IconBlock>
                  </div>
                )}
                {/* {correct === "true" && (
                  <div className="question">
                    <div className="question_text">{props.t("correct")}!</div>
                    <div className="question_name">{author_name}</div>
                  </div>
                )}
                {correct === "true" && ifRight && ifRight !== "<p></p>" && (
                  <div className="question">
                    <div className="question_text">{renderHTML(ifRight)}</div>
                    <div className="question_name">{author_name}</div>
                  </div>
                )}
                {correct === "false" && (
                  <div className="question">
                    <div className="question_text">{props.t("wrong")}...</div>
                    <div className="question_name">{author_name}</div>
                  </div>
                )}
                {hint !== null && hint !== 0 && (
                  <div className="question">
                    <div className="question_text">
                      {("Есть один комментарий. ", hint)}
                    </div>
                    <div className="question_name">{author_name}</div>
                  </div>
                )}
                {correct === "false" && ifWrong && ifWrong !== "<p></p>" && (
                  <div className="question">
                    <div className="question_text">{renderHTML(ifWrong)}</div>
                    <div className="question_name">{author_name}</div>
                  </div>
                )}*/}
                {correct !== "" && props.type != "FORM" && (
                  <>
                    <div className="answer">
                      <IconBlock>
                        <img className="icon" src="../../static/flash.svg" />
                        <div className="name">{me.name}</div>
                      </IconBlock>{" "}
                      <Options>
                        <Option onClick={(e) => setHidden(false)}>Да</Option>
                        {/* <Option onClick={(e) => setHidden(true)}>
                          {props.t("no")}
                        </Option> */}
                      </Options>
                    </div>
                  </>
                )}
                {!hidden && (
                  <div className="question">
                    <div className="question_text">
                      {"Правильный ответ"}: {renderHTML(props.answer)}
                    </div>
                    <IconBlock>
                      {author && author.image != null ? (
                        <img className="icon" src={author.image} />
                      ) : (
                        <img className="icon" src="../../static/hipster.svg" />
                      )}{" "}
                      <div className="name">
                        {author && author.name ? author.name : "BeSavvy"}
                      </div>
                    </IconBlock>{" "}
                  </div>
                )}
              </Question>
            </>
          )}
          {update && (
            <UpdateQuiz
              quizID={props.quizID}
              lessonID={props.lessonID}
              answer={props.answer}
              question={props.question}
              complexity={complexity}
              ifRight={ifRight}
              ifWrong={ifWrong}
              notes={props.notes}
              next={props.next}
              check={check}
              quizes={props.quizes.filter((q) => q.id !== props.quizID)}
              tests={props.tests}
            />
          )}
        </Styles>
      )}
    </Mutation>
  );
};

export default SingleQuiz;
