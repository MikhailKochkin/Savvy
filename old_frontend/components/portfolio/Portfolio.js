import React, { Component } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";
import { useUser } from "../User";
import Task from "./Task";

const Styles = styled.div`
  background-color: white;
  display: block;
  /* font-size: 1.6rem; */
  border: 0.25px solid #f8f8f8;
  border-radius: 4px;
  padding: 2% 4%;
  margin-bottom: 3%;
`;

const Title = styled.div`
  font-size: 2.2rem;
`;

const Uni = styled.div`
  font-size: 1.8rem;
`;

const Career = styled.div`
  font-size: 1.8rem;
`;

const DynamicLoadedEditor = dynamic(import("../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

class Portfolio extends Component {
  state = {
    stage: "2",
    text: "",
    list: [],
  };
  myCallback = (dataFromChild) => {
    this.setState({
      text: dataFromChild,
    });
  };

  getInfo = (dataFromChild) => {
    this.setState((state) => {
      const list = [...state.list, dataFromChild];
      return {
        list,
      };
    });
  };

  save = () => {
    console.log("Сохранить!");
  };

  next = () => {
    this.setState({ stage: "2" });
  };
  prev = () => {
    this.setState({ stage: "1" });
  };

  // add = e => {
  //   console.log("Hey!");
  //   let id = e.target.getAttribute("data");
  //   this.setState(state => {
  //     const list = [...state.list, id];
  //     return {
  //       list
  //     };
  //   });
  // };
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <>
            <Styles>
              {" "}
              <Title>{me.name}</Title>
              <Uni>{me.uni.title}</Uni>
              <Career>
                Карьерный трек:{" "}
                {me.careerTrackID === "cjymyvxjqqsoh0b53wtdnpzkk" &&
                  "Корпоративный юрист"}
              </Career>
            </Styles>

            {this.state.stage == "1" && (
              <>
                <Styles>
                  <div>
                    Создайте ваше юридическое портфолио в несколько этапов:
                  </div>
                  <p>Этап 1. CV</p>
                </Styles>
                <DynamicLoadedEditor getEditorText={this.myCallback} />
              </>
            )}

            {this.state.stage == "2" && (
              <Styles>
                <p>Этап 2. Выбор примеров работ для портфолио</p>
                {me.examAnswers.map((answer, index) => (
                  <>
                    <Task
                      answer={answer}
                      index={index + 1}
                      addData={this.getInfo}
                    />
                    <button data={answer.id} onClick={this.add}>
                      Добавить
                    </button>
                    <button onClick={this.remove}>Убрать</button>
                  </>
                ))}
              </Styles>
            )}

            <button onClick={this.prev}>Предыдущий этап</button>
            <button onClick={this.next}>Следующий этап</button>
            {/* <button onClick={this.save}>Сохранить</button>
              <button>Опубликовать</button> */}
          </>
        )}
      </User>
    );
  }
}

export default Portfolio;
