import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleProblem from "../../delete/DeleteSingleProblem";
import Interactive from "./Interactive";
import UpdateProblem from "./UpdateProblem";
import HoverEditor from "../../editor/HoverEditor";

const CREATE_PROBLEMRESULT_MUTATION = gql`
  mutation CREATE_PROBLEMRESULT_MUTATION(
    $answer: String
    $revealed: [String!]
    $lessonId: String
    $problemID: String
  ) {
    createProblemResult(
      answer: $answer
      revealed: $revealed
      lessonId: $lessonId
      problemID: $problemID
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  width: ${(props) => (props.story ? "100vw" : "100%")};
  max-width: 540px;
  font-size: 1.6rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2%;
  margin-bottom: 3%;
  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    /* line-height: 1.6; */
    p {
      margin: 10px 0;
      line-height: 1.4;
    }
  }
  #text {
    width: 100%;
  }
  .hint {
    color: #333a8a;
    text-decoration: underline;
    cursor: pointer;
  }
  p {
    line-height: 1.6;
    font-weight: 500;
  }
  h2 p {
    line-height: 1.2;
    width: 90%;
    font-size: 3.2rem;
    font-weight: 700;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 20em;
    @media (max-width: 750px) {
      width: 100%;
      height: auto;
    }
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: auto;
    }
  }
  #question {
    background: #f5f5f5;
    padding: 15px 20px;
    border-radius: 20px;
    .line_top {
      border-top: 1px solid #d0d0d0;
      padding-top: 20px;
    }
  }
  #conceal {
    margin: 16px 0;
    cursor: pointer;
    color: rgb(51, 58, 138);
    text-decoration: underline;
  }
  @media (max-width: 800px) {
    width: 100%;
    padding: 2%;
    font-size: 1.6rem;
    #text {
      width: 100%;
    }
  }
`;

const ResponseArea = styled.div`
  width: 100%;
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 100%;
  margin: 1.5% 0;
  height: 120px;
  padding: 0% 3%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  pointer-events: ${(props) => (props.block ? "none" : "auto")};
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const Button2 = styled.div`
  min-width: 170px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 10px;
  background: #000000;
  padding: 10px 10px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  @media (max-width: 800px) {
    width: 65%;
  }
  transition: 0.3s;
  &:hover {
    background: #444444;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    borderRadius: "10px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    textTransform: "none",
    padding: "10px",
    width: "170px",
  },
})(Button);

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

class SingleProblem extends Component {
  state = {
    answer: "",
    showAnswer: false,
    revealed: [],
    update: false,
    teacher_answer: "",
    isFinished: false,
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  myCallback = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild,
    });
  };

  onCheck = (data) => {
    if (!this.state.revealed.includes(data)) {
      this.setState((prevState) => ({
        revealed: [...prevState.revealed, data],
      }));
    }
  };

  onFinish = (status) => {
    this.setState({ isFinished: true });
  };

  onMouseClick = (e) => {
    let answer = e.target.innerHTML.toLowerCase().trim();
    if (
      e.target.getAttribute("concealed") === "true" &&
      ((answer !== "ответ" && answer !== "ответ." && answer !== "ответ:") ||
        this.state.revealAnswer)
    ) {
      e.target.id = "no-conceal";
      e.target.innerHTML = e.target.getAttribute("data");
      e.target.setAttribute("concealed", "false");

      this.onCheck(e.target.innerHTML);
    } else if (e.target.parentElement.getAttribute("concealed") === "false") {
      e.target.parentElement.id = "conceal";
      e.target.parentElement.setAttribute("concealed", "true");
      e.target.parentElement.innerHTML =
        e.target.parentElement.getAttribute("data-text");
    }
  };

  componentDidMount() {
    const elements = document
      .getElementById(this.props.problem.id)
      .querySelectorAll("#conceal");
    let p;

    elements.forEach((element) => {
      let answer = element.getAttribute("data-text").toLowerCase();

      if (
        element.getAttribute("concealed") === "true" ||
        (answer !== "ответ" && answer !== "ответ." && answer !== "ответ:")
      ) {
        let data = element.innerHTML;
        let hint = element.getAttribute("data-text");
        element.innerHTML = hint;
        element.setAttribute("data", data);
        element.setAttribute("concealed", true);
        element.addEventListener("click", this.onMouseClick);
      } else {
        this.setState({ teacher_answer: element.innerHTML });
        element.style.display = "none";
      }
    });
    // elements[0].style.display = "none";
  }
  render() {
    const { problem, me, lesson, story, complexity, author } = this.props;

    return (
      <>
        {!this.state.update && (
          <TextBar id={problem.id} story={story}>
            <div id="text">{renderHTML(problem.text)}</div>
            {problem.nodeID && (
              <Interactive
                lesson={lesson}
                me={me}
                problem={problem}
                story={story}
                author={author}
                onFinish={this.onFinish}
              />
            )}
            {(this.state.isFinished || !problem.nodeID) && (
              <ResponseArea>
                <h2>Write down the answer</h2>
                <Frame story={story}>
                  <HoverEditor
                    index={1}
                    name="answer"
                    getEditorText={this.myCallback}
                    placeholder={``}
                  />
                </Frame>
                <Mutation
                  mutation={CREATE_PROBLEMRESULT_MUTATION}
                  variables={{
                    lessonId: this.props.lessonID,
                    answer: this.state.answer,
                    revealed: this.state.revealed,
                    problemID: this.props.problem.id,
                  }}
                >
                  {(createProblemResult, { loading, error }) => (
                    <Buttons story={story} block={this.state.revealAnswer}>
                      <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={async (e) => {
                          // Stop the form from submitting
                          e.preventDefault();
                          // call the mutation
                          if (this.state.answer !== "") {
                            const res = await createProblemResult();
                            const res2 = await this.setState({
                              showAnswerButton: true,
                            });
                            console.log("Yes");
                          } else {
                            console.log("No");
                          }
                        }}
                      >
                        {loading ? "Answering..." : "Answer"}
                      </StyledButton>
                      {this.state.showAnswerButton && (
                        <Button2
                          onClick={(e) =>
                            this.setState((prevState) => ({
                              showAnswerText: !prevState.showAnswer,
                            }))
                          }
                        >
                          Show the correct answer
                        </Button2>
                      )}
                    </Buttons>
                  )}
                </Mutation>
                {this.state.showAnswerText && (
                  <div>
                    <h2>Ответ</h2>
                    {renderHTML(this.state.teacher_answer)}
                  </div>
                )}
              </ResponseArea>
            )}
            {/* )} */}
            {me && !story && (
              <StyledButton onClick={(e) => this.setState({ update: true })}>
                Изменить
              </StyledButton>
            )}
            {me && !story ? (
              <DeleteSingleProblem
                id={problem.id}
                lessonId={this.props.lessonID}
              />
            ) : null}
          </TextBar>
        )}
        {this.state.update && (
          <>
            <UpdateProblem
              id={problem.id}
              text={problem.text}
              lessonID={this.props.lessonID}
              nodeID={problem.nodeID}
              nodeType={problem.nodeType}
              complexity={complexity}
              quizes={lesson.quizes}
              newTests={lesson.newTests}
              notes={lesson.notes}
            />
          </>
        )}
      </>
    );
  }
}

SingleProblem.propTypes = {
  lessonID: PropTypes.string,
  story: PropTypes.string,
  problem: PropTypes.object.isRequired,
  me: PropTypes.object,
  lesson: PropTypes.object,
};

export default SingleProblem;
