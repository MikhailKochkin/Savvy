import React, { Component } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import _ from "lodash";
import gql from "graphql-tag";
import Router from "next/router";
import Link from "next/link";
import { NavButton, SubmitButton, Message } from "../styles/Button";
import AreYouATeacher from "../auth/AreYouATeacher";
import PleaseSignIn from "../auth/PleaseSignIn";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";

const CREATE_CONSTRUCTION_MUTATION = gql`
  mutation CREATE_CONSTRUCION_MUTATION(
    $name: String!
    $variants: [String!]
    $answer: [String!]
    $hint: String
    $type: String!
    $lessonID: ID!
  ) {
    createConstruction(
      name: $name
      lessonID: $lessonID
      variants: $variants
      answer: $answer
      hint: $hint
      type: $type
    ) {
      id
    }
  }
`;

const CustomSelect = styled.div``;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2%;
`;

const Textarea = styled.textarea`
  font-size: 1.6rem;
  height: 100px;
  width: 90%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 2%;
  font-size: 1.6rem;
  margin-top: 3%;

  @media (max-width: 800px) {
    width: 350px;
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
`;

const ChooseTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  select {
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
  select.number {
    width: 20%;
    margin-top: 5%;
    margin: 3%;
  }
  select.type {
    width: 80%;
    margin-top: 5%;
    margin: 3%;
  }

  ${CustomSelect} {
    width: 70%;
    border-radius: 3px;
  }
  ${CustomSelect} select {
    width: 100%;
    border: none;
    box-shadow: none;
    background: #0878c6;
    color: white;
  }
  ${CustomSelect} select:focus {
    outline: none;
  }
  @media (max-width: 800px) {
    select {
      width: 100%;
    }
    ${CustomSelect} {
      width: 70%;
      border-radius: 3px;
    }
  }
`;

const Box = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #eff8ff;
  width: 90%;
  padding: 2%;
`;

const Variants = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

class CreateConstructor extends Component {
  state = {
    name: "12",
    partsNumber: 5,
    lessonID: this.props.lessonID,
    type: "equal",
    variants: "",
    answer: "",
    answerNumber: "",
    hint: ""
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const val = parseInt(value);
    this.setState({ [name]: val });
  };

  handleAnswer = e => {
    e.preventDefault();
    const { name, value, id } = e.target;
    this.setState({ [name]: value });
  };

  handleName = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  saveToState = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  generate = () => {
    const variants = [
      this.state.doc1,
      this.state.doc2,
      this.state.doc3,
      this.state.doc4,
      this.state.doc5,
      this.state.doc6,
      this.state.doc7,
      this.state.doc8,
      this.state.doc9,
      this.state.doc10,
      this.state.doc11,
      this.state.doc12,
      this.state.doc13,
      this.state.doc14,
      this.state.doc15,
      this.state.doc16,
      this.state.doc17,
      this.state.doc18,
      this.state.doc19
    ];
    const newVariants = variants.filter(item => item !== undefined);
    const data = this.state.answerNumber;
    this.setState({ variants: newVariants });
    const data1 = data
      .trim()
      .split(",")
      .map(item => parseInt(item) - 1);
    const answer = [];
    let option;
    const data2 = data1.map(i => {
      option = newVariants[i];
      answer.push(option);
    });
    this.setState({ answer: answer });
    document.getElementById("Message").style.display = "block";
    setTimeout(function() {
      document.getElementById("Message")
        ? (document.getElementById("Message").style.display = "none")
        : "none";
    }, 4000);
  };
  render() {
    let card = [];
    let index;
    let placeholder;
    let text;
    _.times(this.state.partsNumber, i => {
      index = `doc${i + 1}`;
      placeholder = `${i + 1}.`;
      text = `Статья ${i + 1}`;
      card.push(
        <Box>
          <Textarea
            key={index}
            name={index}
            spellCheck={true}
            onChange={this.handleAnswer}
            placeholder={text}
          />
        </Box>
      );
    });
    const { lessonID } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={lessonID}>
          <Center>
            <Header>
              <ChooseTag>
                <p>Сколько в документе частей?</p>
                <select
                  className="number"
                  name="partsNumber"
                  value={this.state.partsNumber}
                  onChange={this.handleChange}
                >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                </select>
              </ChooseTag>
              <ChooseTag>
                <p> Метод проверки </p>
                <select
                  className="type"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleAnswer}
                >
                  <option value="equal">
                    Важна последовательность ответов
                  </option>
                  <option value="include">
                    Не важна последовательность ответов
                  </option>{" "}
                </select>
              </ChooseTag>
            </Header>
            <Box>
              <Textarea
                type="text"
                placeholder="Название документа"
                spellCheck={true}
                name="name"
                placeholder="Название документа. Например: Договор оказания медицинских услуг"
                onChange={this.saveToState}
              />
            </Box>
            <Variants>{card.map(item => item)}</Variants>
            <Box>
              <Textarea
                type="text"
                cols={60}
                rows={1}
                spellCheck={true}
                name="answerNumber"
                placeholder="Запишите правильные ответы. Используйте только цифры и запишите
                их через запятые, без пробелов: 1,2,3,4"
                onChange={this.saveToState}
              />
            </Box>
            <Box>
              <Textarea
                type="text"
                cols={60}
                rows={1}
                spellCheck={true}
                name="hint"
                placeholder="Запишите подсказку или пояснение к документу."
                onChange={this.saveToState}
              />
            </Box>
            <Mutation
              mutation={CREATE_CONSTRUCTION_MUTATION}
              variables={{
                lessonID,
                ...this.state
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: lessonID }
                }
              ]}
              awaitRefetchQueries={true}
            >
              {(createConstruction, { loading, error }) => (
                <Button
                  onClick={async e => {
                    e.preventDefault();
                    const res0 = await this.generate();
                    const res = await createConstruction();
                  }}
                >
                  {loading ? "Сохраняем..." : "Сохранить"}
                </Button>
              )}
            </Mutation>
            <Message id="Message">Вы создали новый тестовый вопрос!</Message>
          </Center>
        </AreYouATeacher>
      </PleaseSignIn>
    );
  }
}

export default CreateConstructor;
