import React, { Component } from "react";
import _ from "lodash";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Right from "./Right";
import Wrong from "./Wrong";
import DeleteSingleConstructor from "../delete/DeleteSingleConstructor";
import { SINGLE_LESSON_QUERY } from "./SingleLesson";
import { CURRENT_USER_QUERY } from "../User";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonID: ID
    $constructionID: ID
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonID: $lessonID
      constructionID: $constructionID
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 90%;
  padding: 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Variants = styled.div`
  flex-basis: 45%;
`;

const Answers = styled.div`
  flex-basis: 45%;
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const Button = styled.button`
  padding: 1.5% 3%;
  width: 40%;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 600;
  margin-top: 3%;
  margin-bottom: 3%;
  color: #fffdf7;
  background: ${props => (props.promo ? "#FF6663" : "#5DAE76")};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #294d4a;
  }
`;

const Box = styled.div``;

const Title = styled.p`
  font-size: 1.8rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  input {
    padding: 2%;
    width: 15%;
    border: none;
    border-bottom: 1px solid grey;
    white-space: nowrap;
  }
  input:focus {
    outline: none;
  }
`;

class SingleConstructor extends Component {
  state = {
    variants: this.props.variants,
    answer: this.props.construction.answer,
    received: this.props.arr,
    answerState: "",
    type: this.props.construction.type,
    attempts: 0
  };

  answerState = "";

  handleSteps = e => {
    e.preventDefault();
    // 1. Get the user variant for a particular article
    const { value } = e.target;
    // 2. Get the number of the article
    const article_number = e.target.getAttribute("data");
    console.log(article_number, value);
    // 3. Save to state the user data
    this.setState(state => {
      const received = state.received.map((item, index) => {
        console.log(item, index);
        if (index === article_number - 1) {
          console.log(this.state.variants[value - 1]);
          return (item = this.state.variants[value - 1]);
        } else {
          return item;
        }
      });
      return { received };
    });
  };

  check = () => {
    // 1. Find out the rule for checking the answer
    if (this.state.type === "include") {
      let res;
      // 2. Check if all the answers have been given
      if (new Set(this.state.received).size !== this.state.received.length) {
        // If not, show that the answer is wrong
        this.setState({ answerState: "wrong" });
        this.setState(prevState => ({
          attempts: prevState.attempts + 1
        }));
      } else {
        // 3. Check if all the correct variants are included into the answer, order does not matter
        this.state.received.map(item => {
          if (this.state.answer.includes(item)) {
            this.setState({ answerState: "right" });
          } else {
            this.setState({ answerState: "wrong" });
            this.setState(prevState => ({
              attempts: prevState.attempts + 1
            }));
          }
        });
      }
    } else if (this.state.type === "equal") {
      if (
        JSON.stringify(this.state.answer) == JSON.stringify(this.state.received)
      ) {
        this.setState({ answerState: "right" });
      } else {
        this.setState({ answerState: "wrong" });
        this.setState(prevState => ({
          attempts: prevState.attempts + 1
        }));
      }
    }
  };
  render() {
    switch (this.state.answerState) {
      case "think":
        this.answerState = "";
        break;
      case "right":
        this.answerState = <Right>Правильно!</Right>;
        break;
      case "wrong":
        this.answerState = <Wrong>Неправильно!</Wrong>;
        break;
      default:
        this.answerState = "";
        break;
    }
    const { me, lessonID, construction } = this.props;
    const data = this.props.userData.filter(
      result => result.construction.id === construction.id
    );
    return (
      <Styles>
        <Variants>
          <Title>{construction.name}</Title>
          {this.state.variants.map((option, index) => (
            <Box>
              <p key={index}>
                <span>{index + 1}. </span>
                {option}
              </p>
            </Box>
          ))}
        </Variants>
        <Answers>
          <Title>Составьте документ</Title>
          {this.state.received.map((option, index) => (
            <Label>
              <input
                data={index + 1}
                type="number"
                onChange={this.handleSteps}
              />
              <span>{this.state.received[index]}</span>
            </Label>
          ))}
          <Mutation
            mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
            variables={{
              lessonID,
              answer: "Drafted!",
              attempts: this.state.attempts,
              constructionID: this.props.construction.id
            }}
            refetchQueries={() => [
              {
                query: SINGLE_LESSON_QUERY,
                variables: { id: lessonID }
              },
              {
                query: CURRENT_USER_QUERY
              }
            ]}
          >
            {(createConstructionResult, { loading, error }) => (
              <Button
                onClick={async e => {
                  e.preventDefault();
                  const res = await this.check();
                  if (data.length === 0) {
                    if (this.state.answerState === "right") {
                      console.log("Ура!");
                      const res2 = await createConstructionResult();
                    }
                  }
                }}
              >
                Проверить
              </Button>
            )}
          </Mutation>
          {this.answerState}
          {this.state.answerState === "wrong" ? (
            <p>Подсказка: {construction.hint}</p>
          ) : null}
          {me && me.id === construction.user.id ? (
            <DeleteSingleConstructor id={construction.id} lessonID={lessonID} />
          ) : null}
        </Answers>
      </Styles>
    );
  }
}

export default SingleConstructor;
