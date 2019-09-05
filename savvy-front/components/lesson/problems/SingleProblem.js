import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import renderHTML from "react-render-html";
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
  margin-top: 3%;
  width: 20%;
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

const Form = styled.form`
  textarea {
    height: 150px;
    width: 90%;
    border: 1px solid #c4c4c4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 2%;
    font-size: 1.6rem;
    margin-top: 1%;
    height: 100px;
    outline: 0;
    @media (max-width: 750px) {
      width: 95%;
      height: auto;
    }
  }
`;

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
    const data = this.props.userData.filter(
      result => result.problem.id === this.props.problem.id
    );
    console.log(this.props.lessonID);
    return (
      <>
        <TextBar>
          {renderHTML(problem.text)}
          {data.length > 0 && (
            <>
              <p>Работа уже сдана.</p>
              <Button
                onClick={async e => {
                  // Stop the form from submitting
                  e.preventDefault();
                  // call the mutation
                  const res2 = await this.setState({ revealAnswer: true });
                  // change the page to the single case page
                }}
              >
                Ответить
              </Button>
            </>
          )}
          {!this.state.revealAnswer && data.length < 1 && (
            <Form>
              {this.state.revealAnswer && (
                <p>Теперь вы можете посмотреть ответ.</p>
              )}
              <textarea
                rows={4}
                id="answer"
                name="answer"
                placeholder="Ответ..."
                required
                value={this.state.answer}
                onChange={this.handleChange}
              />
            </Form>
          )}
          {data.length === 0 && (
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
                  onClick={async e => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    // const res = await createProblemResult();
                    const res2 = await this.setState({ revealAnswer: true });
                  }}
                >
                  {loading ? "В процессе" : "Ответить"}
                </Button>
              )}
            </Mutation>
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
