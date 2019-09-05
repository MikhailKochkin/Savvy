import React, { Component } from "react";
import styled from "styled-components";

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  border-radius: 10px;
  width: 270px;
  min-height: 290px;
  padding: 2% 4%;
  a {
    color: #112a62;
    &:hover {
      font-weight: 600;
    }
  }
  .text {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 10px;
  }
  .mail {
    padding-top: 10px;
  }
`;

const Header = styled.div`
  font-size: 2.4rem;
  padding-bottom: 6%;
  padding-top: 4%;
  line-height: 1.4;
`;

const Part1 = styled.div``;
const Part2 = styled.div``;

class ApplicationCard extends Component {
  render() {
    return (
      <Payment>
        <Part1>
          <Header>Заявка на расммотрении</Header>
        </Part1>
        <Part2>
          <div className="text">
            Подождите совсем чуть-чуть. Мы откроем вам доступ к курсу в течение
            часа.
          </div>
          <div className="mail">
            Если возникла ошибка,{" "}
            <a href="mailto:mikhailvkochkin@gmail.com">пишите нам</a> .
          </div>
        </Part2>
      </Payment>
    );
  }
}

export default ApplicationCard;
