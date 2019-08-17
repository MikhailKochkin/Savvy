import React, { Component } from "react";
import SingleConstructor from "./SingleConstructor";
import styled from "styled-components";

const Title = styled.p`
  @import url("https://fonts.googleapis.com/css?family=Comfortaa&display=swap");
  font-family: "Comfortaa", cursive;
  font-size: 2.2rem;
  font-weight: bold;
  color: #112962;
`;

const Button = styled.button`
  border: none;
  background: none;
  a {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
  }

  a:hover {
    background-color: #112862;
    color: white;
  }

  .previous {
    background-color: #f1f1f1;
    color: black;
    text-align: center;
  }

  .next {
    background-color: #f1f1f1;
    color: black;
  }

  .round {
    border-radius: 50%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Advice = styled.p`
  font-size: 1.8rem;
  margin: 1% 4%;
  background: #fefae9;
  border-left: 6px solid #f0c40f;
  padding: 2% 4%;
`;

class TextEditorGroup extends Component {
  state = {
    shown: false,
    num: 0
  };
  onNext = () => {
    if (this.state.num < this.props.constructions.length - 1) {
      this.setState(prevState => ({
        num: prevState.num + 1
      }));
    }
  };
  onPrev = () => {
    if (this.state.num > 0) {
      this.setState(prevState => ({
        num: prevState.num - 1
      }));
    }
  };

  shuffle = array => {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };

  render() {
    const userData = this.props.constructionResults.filter(
      result => result.student.id === this.props.me.id
    );
    let arr;
    const construction = this.props.constructions[this.state.num];
    const variants = this.shuffle(construction.variants);
    return (
      <>
        <Advice>
          <b>Совет</b>: чтобы увидеть, правильно ли вы нашли все риски ю ошибки,
          вам нужно сначала постараться самим найти все ошибки. После того, как
          вы найдете все существующие, по вашему мнению, ошибки, вы можете
          нажать на кнопку "Показать све ошибки".{" "}
        </Advice>
        <Title>
          Редактор документов {this.state.num + 1} из{" "}
          {this.props.constructions.length}
        </Title>
        <Buttons>
          <Button onClick={this.onPrev}>
            <a href="#" className="previous">
              &#8249;
            </a>
          </Button>
          <Button onClick={this.onNext}>
            <a href="#" className="next">
              &#8250;
            </a>
          </Button>
        </Buttons>
        {(arr = Array(construction.answer.length).fill(""))}
        <SingleConstructor
          key={construction.id}
          lessonID={this.props.lessonID}
          construction={construction}
          me={this.props.me}
          arr={arr}
          userData={userData}
          variants={variants}
        />
      </>
    );
  }
}

export default TextEditorGroup;
