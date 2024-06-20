import React from "react";
import styled from "styled-components";

const Styles = styled.div`
  display: flex;
  margin: 40px 0;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
  align-items: center;
  justify-content: center;
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const Onboarding = (props) => {
  return (
    <Styles>
      <Container>
        <h2>Спасибо, что решили учиться вместе с нами!</h2>
        <p>Рассказываем, как открыть доступ к курсу.</p>
        <ol>
          <li>Нажмите на диалоговый виджет в правом нижнем углу экрана</li>
          <li>
            Напишите нам, какой курс (курсы) вас заинтересовал. Не забудьте
            указать свой email после начала диалога.
          </li>
          <li>
            Если виджет почему-то не загрузился, просто напишите нам в телеграм{" "}
            <a href="https://www.t.me/mikkochkin">по этой ссылке</a>.
          </li>
          <li>
            Мы быстро все откроем и отправим ссылки на чаты участников курсов.
          </li>
          <p>До встречи на занятиях.</p>
        </ol>
      </Container>
    </Styles>
  );
};

export default Onboarding;
