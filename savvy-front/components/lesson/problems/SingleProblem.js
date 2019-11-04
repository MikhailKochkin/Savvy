import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";
import DeleteSingleProblem from "../../delete/DeleteSingleProblem";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { CURRENT_USER_QUERY } from "../../User";

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
  width: 85%;
  font-size: 1.6rem;
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

const Button = styled.button`
  padding: 1.5% 3%;
  font-size: 1.6rem;
  font-weight: 600;
  /* margin-top: 3%; */
  width: 30%;
  color: #fffdf7;
  background: ${props => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${props => props.theme.darkGreen};
  }
  @media (max-width: 800px) {
    width: 40%;
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
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 5px 0 15px 0;
  width: 45%;
  @media (max-width: 850px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

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
    const { problem, me, userData } = this.props;
    const data = userData
      .filter(result => result.problem.id === problem.id)
      .filter(result => result.student.id === me.id);
    return (
      <>
        <TextBar>
          {renderHTML(problem.text)}
          {data.length > 0 && (
            <ButtonGroup>
              <Advice>Эта задача уже выполнена.</Advice>
              <Button
                onClick={async e => {
                  e.preventDefault();
                  const res2 = await this.setState(prev => ({
                    revealAnswer: !prev.revealAnswer
                  }));
                }}
              >
                {this.state.revealAnswer ? "Закрыть ответы" : "Открыть ответы"}
              </Button>
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
                  <Button
                    className="button"
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
                  </Button>
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
      </>
    );
  }
}

export default SingleProblem;
