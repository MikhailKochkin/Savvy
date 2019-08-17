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
  margin: 1%;
  outline: none;
  padding: 1%;
  font-size: 1.6rem;
  resize: none;

  @media (max-width: 800px) {
    width: 350px;
  }
`;

const ChooseTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  select.number {
    width: 10%;
    font-size: 1.4rem;
    margin-top: 5%;
    margin: 3%;
  }
  select.type {
    width: 50%;
    font-size: 1.4rem;
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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  p {
    flex-basis: 50%;
    text-align: center;
    align-items: center;
    padding: 1% 3%;
  }
  textarea {
    flex-basis: 50%;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  background: #eff8ff;
  width: 100%;
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
    lessonID: this.props.id,
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
      placeholder = `${i + 1}`;
      text = `Статья ${i + 1}`;
      card.push(
        <Box>
          <p>{text}</p>
          <Textarea
            key={index}
            name={index}
            cols={60}
            rows={5}
            spellCheck={true}
            onChange={this.handleAnswer}
          />
        </Box>
      );
    });
    const { id } = this.props;
    return (
      <PleaseSignIn>
        <AreYouATeacher subject={id}>
          <Center>
            <Link
              href={{
                pathname: "/lesson",
                query: { id: this.props.id }
              }}
            >
              <a>
                <NavButton>К уроку</NavButton>
              </a>
            </Link>
            <h2>Создаем конструктор</h2>
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
              <p className="first">Название документа</p>
              <Textarea
                type="text"
                cols={60}
                rows={1}
                spellCheck={true}
                name="name"
                placeholder="Например: Договор оказания медицинских услуг"
                onChange={this.saveToState}
              />
            </Box>
            <Variants>{card.map(item => item)}</Variants>
            <Box>
              <p className="first">
                Запишите правильные ответы. Используйте только цифры и запишите
                их через запятые, без пробелов.
              </p>
              <Textarea
                type="text"
                cols={60}
                rows={1}
                spellCheck={true}
                name="answerNumber"
                placeholder="1,2,3,4"
                onChange={this.saveToState}
              />
            </Box>
            <Box>
              <p className="first">
                Запишите подсказку или пояснение к документу.
              </p>
              <Textarea
                type="text"
                cols={60}
                rows={1}
                spellCheck={true}
                name="hint"
                placeholder="Подсказка"
                onChange={this.saveToState}
              />
            </Box>
            <br />
            <Mutation
              mutation={CREATE_CONSTRUCTION_MUTATION}
              variables={{
                lessonID: id,
                ...this.state
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id }
                }
              ]}
              awaitRefetchQueries={true}
            >
              {(createConstruction, { loading, error }) => (
                <SubmitButton
                  onClick={async e => {
                    e.preventDefault();
                    const res0 = await this.generate();
                    const res = await createConstruction();
                    Router.push({
                      pathname: "/lesson",
                      query: { id }
                    });
                  }}
                >
                  Сохранить документ
                </SubmitButton>
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
