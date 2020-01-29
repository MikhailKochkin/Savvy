import React, { Component } from "react";
import _ from "lodash";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteSingleConstructor from "../../delete/DeleteSingleConstructor";

const CREATE_CONSTRUCTIONRESULT_MUTATION = gql`
  mutation CREATE_CONSTRUCTIONRESULT_MUTATION(
    $answer: String
    $attempts: Int
    $lessonID: ID
    $constructionID: ID
    $inputs: [String]
  ) {
    createConstructionResult(
      answer: $answer
      attempts: $attempts
      lessonID: $lessonID
      constructionID: $constructionID
      inputs: $inputs
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 100%;
  padding-right: 4%;
  display: flex;
  margin-bottom: 4%;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
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

const Box = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  /* padding: 0 4%; */
  margin-bottom: 4%;
  input {
    pointer-events: none;
  }
  .box {
    padding: 0 15px;
  }
  .number {
    width: 100%;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    background: #edefed;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  border: 1px dashed #c4c4c4;
  padding: 4%;
  border-radius: 10px;
  margin-bottom: 4%;

  input.l {
    padding: 2%;
    width: 22%;
    border: none;
    border-bottom: 1px solid grey;
    white-space: nowrap;
    font-family: Montserrat;
    font-size: 1.4rem;
  }

  input#text {
    padding: 2%;
    width: 85%;
    border: none;
    border-bottom: 1px solid grey;
    white-space: nowrap;
    font-family: Montserrat;
    font-size: 1.4rem;
  }
  input:focus {
    outline: none;
  }
`;

const Advice = styled.p`
  font-size: 1.6rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2% 3%;
  margin: 30px 0;
  width: 100%;
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

class SingleConstructor extends Component {
  state = {
    variants: [],
    answer: this.props.construction.answer,
    received: this.props.arr,
    answerState: "",
    type: this.props.construction.type,
    attempts: 1,
    inputs: ""
  };

  answerState = "";

  shuffle = array => {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  handleSteps = e => {
    e.preventDefault();
    // 1. Get the user variant for a particular article
    const { value } = e.target;
    // 2. Get the number of the article
    const article_number = e.target.getAttribute("data");
    // 3. Save to state the user data
    this.setState(state => {
      const received = state.received.map((item, index) => {
        if (index === article_number - 1) {
          if (this.state.variants[value - 1] === undefined) {
            return (item = "");
          } else {
            return (item = this.state.variants[value - 1]);
          }
        } else {
          return item;
        }
      });
      return { received };
    });
  };

  showWrong = () => {
    const elements = document.querySelectorAll(".Var");

    elements.forEach(element => {
      element.style.border = "1px solid #DE6B48";
    });
    // console.log("weo");
    this.setState({ answerState: "wrong" });
    this.setState(prevState => ({
      attempts: prevState.attempts + 1
    }));
    setTimeout(function() {
      elements.forEach(element => {
        element.style.border = "1px solid #c4c4c4 ";
      });
    }, 3000);
  };

  showRight = () => {
    const elements = document.querySelectorAll(".Var");
    elements.forEach(element => {
      element.style.border = "1px solid #84BC9C";
    });
    this.setState({ answerState: "right" });
    document.querySelector(".button").disabled = true;
  };

  check = () => {
    // 0.
    // 1. Find out the rule for checking the answer
    if (this.state.type === "include") {
      let res;
      // 2. Check if all the answers have been given
      if (new Set(this.state.received).size !== this.state.received.length) {
        // If not, show that the answer is wrong
        this.showWrong();
      } else {
        // 3. Check if all the correct variants are included into the answer, order does not matter
        this.state.received.map(item => {
          if (this.state.answer.includes(item)) {
            this.showRight();
          } else {
            this.showWrong();
          }
        });
      }
    } else if (this.state.type === "equal") {
      // 3. Check if all the correct variants are included into the answer, order does matter
      if (
        JSON.stringify(this.state.answer) == JSON.stringify(this.state.received)
      ) {
        this.showRight();
      } else {
        this.showWrong();
      }
    }

    //4. Save the input data
    const data = [];
    Object.entries(this.state)
      .filter(text => text[0].includes("Ввод"))
      .map(t => data.push(t[1]));
    this.setState({ inputs: data });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    const vars = this.shuffle(this.props.variants);
    this.setState({ variants: vars });
  }

  componentDidUpdate() {
    const elements = document.querySelectorAll("#text");
    elements.forEach(element => {
      element.addEventListener("change", this.handleChange);
    });
  }

  render() {
    const { me, lessonID, construction, userData } = this.props;
    const data = userData
      .filter(result => result.construction.id === construction.id)
      .filter(result => result.student.id === this.props.me.id);
    return (
      <Styles>
        <Variants>
          <Title>Конструктор</Title>
          {this.state.variants.map((option, index) => (
            <>
              <Box>
                <div key={index}>
                  <div className="number">{index + 1}. </div>
                  <div className="box">{renderHTML(option)} </div>
                </div>
              </Box>
            </>
          ))}
        </Variants>
        <Answers>
          <Title>{construction.name}</Title>
          {this.state.received.map((option, index) => (
            <Label className="Var" key={index + 1}>
              <input
                className="l"
                data={index + 1}
                type="number"
                onChange={this.handleSteps}
              />
              {renderHTML(this.state.received[index])}
            </Label>
          ))}
          <Mutation
            mutation={CREATE_CONSTRUCTIONRESULT_MUTATION}
            variables={{
              lessonID,
              answer: "Drafted",
              attempts: this.state.attempts,
              constructionID: this.props.construction.id,
              inputs: this.state.inputs
            }}
          >
            {(createConstructionResult, { loading, error }) => (
              <StyledButton
                variant="contained"
                color="primary"
                className="button"
                onClick={async e => {
                  e.preventDefault();
                  const res = await this.check();
                  if (data.length === 0) {
                    if (this.state.answerState === "right") {
                      const res2 = await createConstructionResult();
                    }
                  }
                }}
              >
                Проверить
              </StyledButton>
            )}
          </Mutation>
          {this.state.answerState === "wrong" ? (
            <Advice>Подсказка: {construction.hint}</Advice>
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
