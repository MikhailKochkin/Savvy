import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Option from "../Option";

const Button = styled.button`
  padding: 1% 2%;
  background: ${props => props.theme.green};
  width: 20%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${props => props.theme.darkGreen};
  }
`;

const Button2 = styled.button`
  font-family: Montserrat;
  /* color: #112a62; */
  padding: 0.5% 1%;
  font-size: 1.6rem;
  background: #ffffff;
  /* border: 1px solid #112a62; */
  border-radius: 5px;
  outline: 0;
  margin-top: 3%;
  width: 25%;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

const Question = styled.div`
  margin-top: 3%;
  textarea {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    height: 100px;
    padding: 1.5%;
    font-size: 1.4rem;
    outline: 0;
  }
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
`;

const AnswerOption = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  textarea {
    border-radius: 5px;
    border: 1px solid #c4c4c4;
    width: 80%;
    height: 100px;
    padding: 1.5%;
    font-size: 1.4rem;
    outline: 0;
  }
  select {
    width: 20%;
    font-size: 1.4rem;
    outline: none;
    line-height: 1.3;
    padding: 0.5% 1%;
    /* padding: 0.6em 1.4em 0.5em 0.8em; */
    max-width: 100%;
    box-sizing: border-box;
    margin-top: 2%;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const UPDATE_TEST_MUTATION = gql`
  mutation UPDATE_TEST_MUTATION(
    $id: ID!
    $next: Json
    $question: [String!]
    $answers: [String!]
    $correct: [Boolean!]
  ) {
    updateNewTest(
      id: $id
      next: $next
      question: $question
      answers: $answers
      correct: $correct
    ) {
      id
    }
  }
`;
class UpdateTest extends Component {
  state = {
    question: this.props.question
  };
  myCallback2 = async (type, data) => {
    const res = await this.setState({
      [type]: data
    });
  };

  onAddItem = () => {
    this.setState(state => {
      const list = [...state.list, state.value];
      return {
        list,
        value: ""
      };
    });
  };

  onSave = () => {
    this.setState({
      next: {
        true: this.state.true,
        false: this.state.false
      }
    });
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleBooleanChange = e => {
    let val;
    e.preventDefault();
    const { name, value } = e.target;
    if (value === "true") {
      val = true;
    } else {
      val = false;
    }
    this.setState({ [name]: val });
  };

  onGenerate = e => {
    e.preventDefault();

    const arrAnswers = [
      this.state.answer1,
      this.state.answer2,
      this.state.answer3,
      this.state.answer4,
      this.state.answer5,
      this.state.answer6,
      this.state.answer7,
      this.state.answer8,
      this.state.answer9
    ];
    const arrCorrect = [
      this.state.answer1Correct,
      this.state.answer2Correct,
      this.state.answer3Correct,
      this.state.answer4Correct,
      this.state.answer5Correct,
      this.state.answer6Correct,
      this.state.answer7Correct,
      this.state.answer8Correct,
      this.state.answer9Correct
    ];
    const arrAnswers2 = [];
    const arrCorrect2 = [];
    const arrQuestion = [];
    arrQuestion.push(this.state.question);
    arrAnswers.map(item =>
      item !== undefined ? arrAnswers2.push(item) : null
    );
    for (var i = 0; i < arrAnswers2.length; i++) {
      arrCorrect2.push(arrCorrect[i]);
    }

    this.setState({
      answers: arrAnswers2,
      correct: arrCorrect2,
      questions: arrQuestion
    });
  };
  onSave = async (e, updateNewTest) => {
    e.preventDefault();
    if (!this.state.correct.includes(true)) {
      alert("Должен быть хотя бы один правильный ответ!");
    }

    const res = await updateNewTest();
    alert("Готово!");
  };

  render() {
    const { testID, tests, quizes, notes, question, mes } = this.props;
    return (
      <div>
        <h2>Выберите задания для формата "Экзамен":</h2>
        <Question>
          <textarea
            id="question"
            name="question"
            spellCheck={true}
            placeholder="Вопрос"
            autoFocus
            required
            defaultValue={question}
            onChange={this.handleChange}
          />
        </Question>
        <Answers>
          {mes.map((answer, index) => {
            let num = `answer${index + 1}`;
            let tr = `answer${index + 1}Correct`;
            let an = `Ответ ${index + 1}`;
            return (
              <AnswerOption>
                <textarea
                  id={num}
                  name={num}
                  placeholder={an}
                  required
                  defaultValue={answer[0]}
                  onChange={this.handleChange}
                />
                <select
                  name={tr}
                  defaultValue={answer[1]}
                  onChange={this.handleBooleanChange}
                >
                  <option value={true}>Правильно</option>
                  <option value={false}>Ошибочно</option>
                </select>
              </AnswerOption>
            );
          })}
        </Answers>
        <h3>Вопросы:</h3>
        <Grid>
          {quizes.map(quiz => (
            <Option key={quiz.id} quiz={quiz} getData={this.myCallback2} />
          ))}
        </Grid>
        <h3>Заметки:</h3>
        <Grid>
          {notes.map(note => (
            <Option key={note.id} note={note} getData={this.myCallback2} />
          ))}
        </Grid>
        <h3>Тесты:</h3>
        <Grid>
          {tests.map(test => (
            <Option key={test.id} test={test} getData={this.myCallback2} />
          ))}
        </Grid>
        <Button2 onClick={this.onSave}>Compile</Button2>
        <Mutation
          mutation={UPDATE_TEST_MUTATION}
          variables={{
            id: testID,
            question: this.state.questions,
            answers: this.state.answers,
            correct: this.state.correct,
            ...this.state
          }}
        >
          {(updateNewTest, { loading, error }) => (
            <Button
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res1 = await this.onGenerate(e);
                const res2 = await this.onSave(e, updateNewTest);
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UpdateTest;
