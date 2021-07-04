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
  font-size: 1.6rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2%;
  margin-bottom: 3%;
  #text {
    width: ${(props) => (props.story ? "50%" : "100%")};
  }
  .hint {
    color: #333a8a;
    text-decoration: underline;
    cursor: pointer;
  }
  /* a {
    color: #800000;
    text-decoration: underline;
  } */
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

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: ${(props) => (props.story ? "50%" : "100%")};
  margin: 1.5% 0;
  padding: 0% 3%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  width: ${(props) => (props.story ? "10%" : "30%")};
  pointer-events: ${(props) => (props.block ? "none" : "auto")};
  @media (max-width: 800px) {
    width: 50%;
  }
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
    width: "100%",
  },
})(Button);

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

class SingleProblem extends Component {
  state = {
    answer: "",
    revealAnswer: false,
    revealed: [],
    update: false,
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
      let data = element.innerHTML;
      let hint = element.getAttribute("data-text");
      element.innerHTML = hint;
      element.setAttribute("data", data);
      element.setAttribute("concealed", true);
      element.addEventListener("click", this.onMouseClick);
    });
  }
  render() {
    const { problem, me, userData, lesson, story, complexity, author } =
      this.props;

    const data = userData
      .filter((result) => result.problem.id === problem.id)
      .filter((result) => result.student.id === me.id);
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
              />
            )}
            {data.length > 0 && (
              <ButtonGroup>
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    const res2 = await this.setState((prev) => ({
                      revealAnswer: !prev.revealAnswer,
                    }));
                  }}
                >
                  {this.state.revealAnswer
                    ? "Закрыть ответы"
                    : "Открыть ответы"}
                </StyledButton>
              </ButtonGroup>
            )}
            {this.state.revealAnswer && data.length > 0 && (
              <Frame story={story}>
                <p>
                  <b>Ваш ответ:</b>
                </p>{" "}
                {renderHTML(data[0].answer)}
              </Frame>
            )}
            {data.length === 0 && (
              <>
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
                              revealAnswer: true,
                            });
                            alert(
                              "Ваш ответ сохранен! Вы можете посмотреть вариант преподавателя и перейти к следующему заданию."
                            );
                            console.log("Yes");
                          } else {
                            console.log("No");
                          }
                        }}
                      >
                        {loading ? "В процессе..." : "Ответить"}
                      </StyledButton>
                    </Buttons>
                  )}
                </Mutation>
              </>
            )}
            {me && me.id === problem.user.id && !story && (
              <StyledButton onClick={(e) => this.setState({ update: true })}>
                Изменить
              </StyledButton>
            )}
            {me && me.id === problem.user.id && !story ? (
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
  userData: PropTypes.object,
  lesson: PropTypes.object,
};

export default SingleProblem;
