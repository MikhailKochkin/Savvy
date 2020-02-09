import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleProblem from "../../delete/DeleteSingleProblem";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";
import Interactive from "./Interactive";

const CREATE_PROBLEMRESULT_MUTATION = gql`
  mutation CREATE_PROBLEMRESULT_MUTATION(
    $answer: String
    $revealed: [String!]
    $lessonID: ID
    $problemID: ID
  ) {
    createProblemResult(
      answer: $answer
      revealed: $revealed
      lessonID: $lessonID
      problemID: $problemID
    ) {
      id
    }
  }
`;

const TextBar = styled.div`
  width: 100%;
  font-size: 1.6rem;
  padding: 0;
  padding-top: 2%;
  margin-bottom: 3%;
  @media (max-width: 800px) {
    width: 100%;
    padding: 2%;
    font-size: 1.4rem;
  }
  .hint {
    color: #333a8a;
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    color: #800000;
    text-decoration: underline;
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
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 100%;
  margin: 3% 0;
  padding: 0% 3%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Advice = styled.span`
  display: inline;
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 1%;
  margin: 5px 0 15px 0;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 10px;
`;

const StyledButton = withStyles({
  root: {
    margin: "4% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none",
    width: "40%"
  }
})(Button);

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false
});

class SingleProblem extends Component {
  state = {
    num: 0,
    upload: false,
    answer: "",
    revealAnswer: false,
    revealed: []
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  myCallback = (dataFromChild, name) => {
    let st = name;
    this.setState({
      [st]: dataFromChild
    });
  };

  onCheck = data => {
    if (!this.state.revealed.includes(data)) {
      this.setState(prevState => ({
        revealed: [...prevState.revealed, data]
      }));
    }
  };

  onMouseClick = e => {
    let answer = e.target.innerHTML.toLowerCase().trim();
    if (
      (answer !== "ответ" && answer !== "ответ." && answer !== "ответ:") ||
      this.state.revealAnswer === true
    ) {
      e.target.nextSibling.toggleAttribute("hidden");
    } else {
      console.log("Запрещено");
    }
    this.onCheck(e.target.innerHTML);
  };

  componentDidMount() {
    const elements = document.querySelectorAll("#conceal");
    let p;
    elements.forEach(element => {
      p = document.createElement("P");
      p.innerHTML = element.getAttribute("data-text");
      p.setAttribute("class", "hint");
      element.setAttribute("hidden", "");
      element.parentElement.insertBefore(p, element);
      p.addEventListener("click", this.onMouseClick);
    });
  }
  render() {
    const { problem, me, userData, lesson } = this.props;
    const data = userData
      .filter(result => result.problem.id === problem.id)
      .filter(result => result.student.id === me.id);
    return (
      <>
        <TextBar>
          {renderHTML(problem.text)}
          {problem.nodeID && (
            <Interactive lesson={lesson} me={me} exam={problem} />
          )}
          {data.length > 0 && (
            <ButtonGroup>
              {/* <Advice>Эта задача уже выполнена.</Advice> */}
              <StyledButton
                variant="contained"
                color="primary"
                onClick={async e => {
                  e.preventDefault();
                  const res2 = await this.setState(prev => ({
                    revealAnswer: !prev.revealAnswer
                  }));
                }}
              >
                {this.state.revealAnswer ? "Закрыть ответы" : "Открыть ответы"}
              </StyledButton>
            </ButtonGroup>
          )}
          {this.state.revealAnswer && data.length > 0 && (
            <Frame>
              <p>
                <b>Ваш ответ:</b>
              </p>{" "}
              {renderHTML(data[0].answer)}
            </Frame>
          )}
          {data.length === 0 && (
            <>
              <Frame>
                <DynamicLoadedEditor
                  index={1}
                  name="answer"
                  getEditorText={this.myCallback}
                  placeholder={``}
                />
              </Frame>
              <Mutation
                mutation={CREATE_PROBLEMRESULT_MUTATION}
                variables={{
                  lessonID: this.props.lessonID,
                  answer: this.state.answer,
                  revealed: this.state.revealed,
                  problemID: this.props.problem.id
                }}
                refetchQueries={() => [
                  {
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: this.props.lessonID }
                  },
                  {
                    query: CURRENT_USER_QUERY
                  }
                ]}
              >
                {(createProblemResult, { loading, error }) => (
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={async e => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      if (this.state.answer !== "") {
                        const res = await createProblemResult();
                        document.querySelector(".button").disabled = true;
                        const res2 = await this.setState({
                          revealAnswer: true
                        });
                        console.log("Yes");
                      } else {
                        console.log("No");
                      }
                    }}
                  >
                    {loading ? "В процессе..." : "Ответить"}
                  </StyledButton>
                )}
              </Mutation>
            </>
          )}
          {me && me.id === problem.user.id ? (
            <DeleteSingleProblem
              id={problem.id}
              lessonId={this.props.lessonID}
            />
          ) : null}
        </TextBar>
        <div id="root"></div>
      </>
    );
  }
}

export default SingleProblem;
